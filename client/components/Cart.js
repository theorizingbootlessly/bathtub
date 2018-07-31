import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {renderCart, deleteItemFromCart, deleteOneDuck} from '../store/cart'
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

  handleDelete(event, item) {
    event.preventDefault()
    this.props.deleteItem(item)
  }

  handleDeleteOne(event, item) {
    event.preventDefault()
    this.props.deleteOne(item)
  }

  render() {
    const renderCart = !this.props.cart.length ? (
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
            <Link to="/cart" onClick={() => this.handleDelete(event, item)}>
              [Remove these kinds of ducks]
            </Link>
            <br />
            <Link to="/cart" onClick={() => this.handleDeleteOne(event, item)}>
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
  return {
    cart: state.cart.cartItems,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCart: userId => dispatch(renderCart(userId)),
    deleteItem: item => dispatch(deleteItemFromCart(item)),
    deleteOne: item => dispatch(deleteOneDuck(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
