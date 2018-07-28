import React, { Component } from 'react';
import { fetchCart } from '../store/cart';
import { connect } from 'react-redux';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class Checkout extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadCart();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /*async*/ handleSubmit(event) {
    event.preventDefault();
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
        Subtotal: ${subtotal || 0.00}
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
