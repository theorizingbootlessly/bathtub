import React, { Component } from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm'
import { fetchCart } from '../store/cart';
import { connect } from 'react-redux';

class Checkout extends Component {

  componentDidMount() {
    this.props.loadCart();
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
        <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
          <Elements>
            <CheckoutForm />
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
