import React, { Component } from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm'
import { fetchCart } from '../store/cart';
import { connect } from 'react-redux';
import Purchase from '../../server/db/models/purchase';

class Checkout extends Component {

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadCart();
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit() {
    await Purchase.create({
      date: String(new Date()),
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address
    });
  }

  render() {
    let subtotal = 0;
    this.props.cart.forEach(item => {
      subtotal += (item.price * item.quantity)
    });
    return (
      <div>
        Your cart so far:<br />
        <ul>
          {this.props.cart.map(item => {
            return (
              <li key={item.id}>
                {item.name}: ${item.price * item.quantity}<br />
              </li>
            );
          })}
        </ul><br />
        Subtotal: ${subtotal || 0.00}<br />
        Tax (8%): ${subtotal * .08 || 0.00}<br />
        <strong>Total: ${((subtotal * .08) + subtotal) || 0.00}</strong>
        <label forhtml="address">Address</label>
          <input
            type="text"
            value={this.state.address}
            onChange={this.handleChange}
            required />
        <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
          <Elements>
            <CheckoutForm handleSubmit={this.handleSubmit} />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
