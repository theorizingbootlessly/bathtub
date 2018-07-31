import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {renderCart, deleteItemFromCart, deleteOneDuck, renderGuestCart} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteOne = this.handleDeleteOne.bind(this)
  }

  componentDidMount() {
    if (this.props.user.currentUser.id){
      this.props.loadCart(this.props.user.currentUser.id)
    } else {
      this.props.loadGuestCart()
    }
  }

  handleDelete(event, id) {
    event.preventDefault()
    this.props.deleteItem(id)
  }

  handleDeleteOne(event, id) {
    event.preventDefault()
    this.props.deleteOne(id)
  }

  render() {
    const cartHasItems = this.props.cart.length===0 ? (
      'There are no items in your cart!'
    ) : (
      <div>
        {this.props.cart.map(item => (
          <li key={item.id}>
            {item.name}
            <br />
            <img src={item.imgURL} />
            <br />
            {item.color}
            <br />
            ${item.price}
            <br />
            Quantity: {item.quantity}
            <br />
            <Link to="/cart" onClick={() => this.handleDelete(event, item.id)}>
              [Remove these kinds of ducks]
            </Link>
            <br />
            <Link
              to="/cart"
              onClick={() => this.handleDeleteOne(event, item.id)}
            >
              [Remove ONE of this kind of duck]
            </Link>
          </li>
        ))}
      </div>
    )
    return (
      <div>
        {cartHasItems}
        <br />
        <Link to="/checkout">Checkout</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.cart)
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCart: userId =>  dispatch(renderCart(userId)), 
    loadGuestCart: () => dispatch(renderGuestCart()),
    deleteItem: id => dispatch(deleteItemFromCart(id)),
    deleteOne: id => dispatch(deleteOneDuck(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
