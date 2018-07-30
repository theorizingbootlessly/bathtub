import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
import {renderCart} from '../store/cart'
import {createToken} from '../store/token'
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
      total: '',
      subtotal: '',
      tax: '',
      checkComplete: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadCart(this.props.currentUser.id)

    let subtotal = 0
    this.props.cart.forEach(item => {
      subtotal += item.price * item.quantity
    })
    subtotal = Number(subtotal).toFixed(2)
    const total = (Number((subtotal * 0.08)) + Number(subtotal)).toFixed(2)
    this.setState({
      total: total,
      subtotal: subtotal,
      tax: (subtotal * 0.08).toFixed(2)
    })

    this.props.makeToken(this.props.currentUser.id, total)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit() {
    try {
      await axios.post('/api/purchase', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        address: this.state.address,
        cart: 'need to get cartId',
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
        Subtotal: ${this.state.subtotal}
        <br />
        Tax (8%): ${this.state.tax}
        <br />
        <strong>Total: ${this.state.total}</strong>
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
              token={this.props.token}
              total={this.state.total}
            />
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    token: state.token,
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCart: id => dispatch(renderCart(id)),
    makeToken: (id, total) => dispatch(createToken(id, total))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
