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
    let {token} = await this.props.stripe.createToken(this.props.token)
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
      return (
        <div>
          {alert('Purchase complete!')}
          {this.props.clearCheckComplete()}
          {this.props.emptyCartAndClearFields()}
        </div>
      )
    } else if (checkComplete === 'error') {
      return (
        <div>
          {alert('Purchase failed. Please make sure all fields are filled in correctly.')}
          {this.props.clearCheckComplete()}
        </div>
      )
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
