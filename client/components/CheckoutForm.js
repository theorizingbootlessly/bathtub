import React, {Component} from 'react';
import {CardElement, CardSection, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    // event.preventDefault(); // commented out because Stripe docs did not say to include
    let { token } = await this.props.stripe.createToken({name: "Name"});
    // let response = await fetch("/charge", {
    //   method: "POST",
    //   headers: {"Content-Type": "text/plain"},
    //   body: token.id
    // });
    let response = await axios.post('/api/charge', {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    })
  if (response.ok) console.log("Purchase Complete!")
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
