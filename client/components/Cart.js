import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  renderCart,
  deleteItemFromCart,
  deleteOneDuck,
  renderGuestCart,
  updateQuantity,
  deleteItemFromGuestCart,
  updateGuestCart
} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      newQuantity: '',
      item: {}
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteOne = this.handleDeleteOne.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loadAppropriateCart = this.loadAppropriateCart.bind(this)
  }

  componentDidMount() {
    this.loadAppropriateCart()
  }

  loadAppropriateCart() {
    if (this.props.user.currentUser.id) {
      this.props.loadCart(this.props.user.currentUser.id)
    } else {
      this.props.loadGuestCart()
    }
  }

  handleChange(event, item) {
    this.setState({
      newQuantity: event.target.value,
      item
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.props.user.currentUser.id) {
      this.props.editCart(this.state)
    } else {
      this.props.editGuestCart(this.state)
    }

    this.setState({
      newQuantity: ''
    })
  }

  handleDelete(event, item) {
    event.preventDefault()
    if (this.props.user.currentUser.id) {
      this.props.deleteItem(item)
    } else {
      this.props.deleteItemGuestCart(item)
    }
  }

  handleDeleteOne(event, item) {
    event.preventDefault()
    this.props.deleteOne(item)
  }

  render() {
    const cartHasItems =
      this.props.cart === undefined || this.props.cart.length === 0 ? (
        <div>
          <img
            src="https://rlv.zcache.com/funny_duck_in_a_bathtub_cartoon_postcards-rfbd3e44cb15d4cf0980e1acdf7df0528_vgbaq_8byvr_512.jpg"
            className="empty-cart-duck"
          />
          <br />
          There are no items in your cart!
        </div>
      ) : (
        <div className="itemSize">
          {this.props.cart.map(item => (
            <li key={item.id} className="takes-away-bullet-points">
              <span className="duck-name">{item.name}</span>
              <br />
              <img className="picture" src={item.imgURL} />
              <br />
              {item.color}
              <br />
              ${item.price}
              <br />
              Quantity: {item.quantity}
              <br />
              <form onSubmit={this.handleSubmit}>
                Change Quantity to:
                <input
                  name="editQuantity"
                  type="number"
                  value={this.state.newQuantity}
                  onChange={event => {
                    this.handleChange(event, item)
                  }}
                  required
                />
                <button>Submit Change</button>
              </form>
              <br />
              <Link to="/cart" onClick={() => this.handleDelete(event, item)}>
                [Remove these kinds of ducks]
              </Link>
              <br />
              <Link
                to="/cart"
                onClick={() => this.handleDeleteOne(event, item)}
              >
                [Remove ONE of this kind of duck]
              </Link>
            </li>
          ))}
        </div>
      )
    return (
      <div>
        <div className="checkout-link">
          <Link to="/checkout">
            <strong>Checkout</strong>
            <br />
          </Link>
        </div>
        {cartHasItems}
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
    editCart: updatedState => dispatch(updateQuantity(updatedState)),
    editGuestCart: updatedState => dispatch(updateGuestCart(updatedState)),
    loadCart: userId => dispatch(renderCart(userId)),
    loadGuestCart: () => dispatch(renderGuestCart()),
    deleteItem: item => dispatch(deleteItemFromCart(item)),
    deleteOne: item => dispatch(deleteOneDuck(item)),
    deleteItemGuestCart: item => dispatch(deleteItemFromGuestCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
