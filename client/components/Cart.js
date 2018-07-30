import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCart, deleteItemFromCart, deleteOneDuck} from '../store/cart'
import axios from 'axios'

class Cart extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteOne = this.handleDeleteOne.bind(this)
  }

  componentDidMount() {
    this.props.loadCart(this.props.user.currentUser.id)
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
    const renderCart = !this.props.cart.length ? (
      'There are no items in your cart!'
    ) : (
      <div>
        {this.props.cart.map(item => (
          <li key={item.id}>
            <img src={item.imgUrl} />
            <br />
            {item.name}
            <br />
            {item.color}
            <br />
            {item.description}
            <br />
            {item.price}
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
        {renderCart}
        <br />
        <Link to="/checkout">Checkout</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state.cart)
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCart: userId => dispatch(fetchCart(userId)),
    deleteItem: id => dispatch(deleteItemFromCart(id)),
    deleteOne: id => dispatch(deleteOneDuck(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
