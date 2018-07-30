import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/users/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) {
      console.log(response.ok)
      this.setState({complete: true})
    }

    this.props.handleSubmit()
  }

  render() {
    const {checkComplete} = this.props
    if (checkComplete === 'success') {
      return <h1>Purchase Complete</h1>
    } else if (checkComplete === 'error') {
      return <h1>Purchase failed due to insufficient information</h1>
    }
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
