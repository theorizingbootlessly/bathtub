import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import SuccessMessage from './SuccessMessage'

class SingleDuck extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      addedToCart: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addSuccessMessage = this.addSuccessMessage.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      this.addSuccessMessage()
      const buyerId = this.props.currentUser.email
        ? this.props.currentUser.id
        : 'sessionId'
      const addItem = await axios.post('/api/cart', {
        buyerId: buyerId,
        productId: this.props.duck.id,
        quantity: this.state.quantity,
        imgURL: this.props.duck.imgURL,
        name: this.props.duck.name,
        price: this.props.duck.price
      })
    } catch (err) {
      console.log(err)
    }
  }
  addSuccessMessage() {
    this.setState({addedToCart: true})
    setTimeout(() => {
      this.setState({addedToCart: false})
    }, 1000)
  }

  render() {
    const {duck} = this.props
    return (
      <div>
        {duck.name}
        <div>
          <img src={duck.imgURL} />
        </div>
        <div>description: {duck.description}</div>
        <div>${duck.price}</div>
        {this.state.addedToCart ? <SuccessMessage /> : <div />}
        <form>
          <input
            type="number"
            name="quantity"
            onChange={this.handleChange}
            value={this.state.quantity}
          />
          <button type="submit" onClick={this.handleSubmit}>
            Add to Cart
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(SingleDuck)
