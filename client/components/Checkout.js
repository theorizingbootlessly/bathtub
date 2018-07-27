import React, { Component } from 'react';
import { fetchCart, fetchSubtotal } from '../store/cart';
import { connect } from 'react-redux';

class Checkout extends Component {

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      creditCard: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadCart();
    this.props.loadSubtotal();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

  }

  render() {
    return (
      <div>
        Your cart so far:<br />
        <ul>
          {this.props.cart.map(item => {
            return (
              <li key={item.id}>
                {item.name}
                {item.price}<br />
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            required />
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            required />
          <input
            type="text"
            name="address"
            value={this.state.address}
            onChange={this.handleChange}
            required />
          <input
            type="number"
            name="creditCard"
            value={this.state.creditCard}
            onChange={this.handleChange}
            required />
          <button type="submit">Submit</button>
        </form>
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
    loadCart: () => dispatch(fetchCart()),
    loadSubtotal: () => dispatch(fetchSubtotal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
