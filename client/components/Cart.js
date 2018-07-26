import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCart, deleteItemFromCart } from '../store/cart'
import axios from 'axios';

class Cart extends Component {

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event, id) {
    event.preventDefault();
    this.props.deleteItem(id);
  }

  render() {
    const renderCart = (!this.props.cart.length) ? ('There are no items in your cart!') : (
        <div>
          {this.props.cart.map(item =>
            <li key={item.id}>
              <img src={item.imgUrl} /><br />
              {item.name}<br />
              {item.color}<br />
              {item.description}<br />
              {item.price}<br />
              Quantity: {item.quantity}<br />
              <Link to='/cart' onClick={this.handleDelete(event, item.id)}>[Remove]</Link>
            </li>
          )}
        </div>
    );
    return (
      <div>
        {renderCart}<br />
        <Link to='/checkout'>Checkout</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //loadCart: () => dispatch(fetchCart()),
    deleteItem: id => dispatch(deleteItemFromCart(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
