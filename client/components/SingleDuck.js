import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class SingleDuck extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      console.log('checking for duck profile', this.props.duck.imgURL)
      await axios.post(
        `/api/cart/${this.props.currentUser.user.currentUser.id}/cart`,
        {
          id: this.props.duck.id,
          quantity: this.state.quantity,
          imgURL: this.props.duck.imgURL,
          name: this.props.duck.name,
          price: this.props.duck.price
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const {duck} = this.props
    return (
      <div>
        {duck.name}
        <div>
          <img src={duck.imgURL} />
        </div>
        <div>{duck.description}</div>
        <div>${duck.price}</div>
        <div>{duck.quantity} left!</div>
        <form>
          <button type="submit" onClick={this.handleSubmit}>
            Add to Cart
          </button>
          <input
            type="number"
            name="quantity"
            onChange={this.handleChange}
            value={this.state.quantity}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const getUser = state
  return {
    currentUser: getUser
  }
}

export default connect(mapStateToProps)(SingleDuck)
