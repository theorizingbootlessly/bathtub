import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
import {renderCart} from '../store/cart'
import {connect} from 'react-redux'
import axios from 'axios'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      cart: props.cart,
      checkComplete: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadCart()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit() {
    let cartInStringForm = ''
    this.state.cart.forEach(item => {
      cartInStringForm += `id: ${item.id}, quantity: ${item.quantity}. `
    })
    try {
      await axios.post('/api/purchase', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        address: this.state.address,
        cart: cartInStringForm,
        userId: this.props.currentUser.id || null
      })
      this.setState({
        checkComplete: 'success'
      })
    } catch (error) {
      console.log(error)
      this.setState({
        checkComplete: 'error'
      })
    }
  }

  render() {
    let subtotal = 0
    this.props.cart.forEach(item => {
      subtotal += item.price * item.quantity
    })
    subtotal = subtotal || 0.0
    const tax = subtotal * 0.08 || 0.0
    const total = tax + subtotal || 0.0
    return (
      <div>
        Your cart so far:<br />
        <ul>
          {this.props.cart.map(item => {
            return (
              <li key={item.id}>
                {item.name}: ${item.price * item.quantity}
                <br />
              </li>
            )
          })}
        </ul>
        <br />
        Subtotal: ${subtotal}
        <br />
        Tax (8%): ${tax}
        <br />
        <strong>Total: ${total}</strong>
        <form onSubmit={this.handleSubmit}>
          <label forhtml="firstName">First name: </label>
          <input
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          />
          <br />
          <label name="lastName">Last name: </label>
          <input
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          />
          <br />
          <label forhtml="email">Email: </label>
          <input
            name="email"
            type="email"
            placeholder={this.props.currentUser.email || ''}
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <br />
          <label forhtml="address">Address: </label>
          <input
            name="address"
            type="text"
            value={this.state.address}
            onChange={this.handleChange}
            required
          />
          <br />
        </form>
        <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
          <Elements>
            <CheckoutForm
              handleSubmit={this.handleSubmit}
              checkComplete={this.state.checkComplete}
            />
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cartItems,
    // user: state.user,
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCart: () => dispatch(renderCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
