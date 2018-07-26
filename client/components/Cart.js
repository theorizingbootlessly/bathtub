import React, { Component } from 'react';
//import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCart, deleteItemFromCart } from '../store/cart'
import axios from 'axios';

class Cart extends Component {

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    event.preventDefault();
    this.props.deleteItem(id);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.cart.map(item => {
            return (
              <div key={item.id}>
                <li>
                  <img src={item.imgUrl} /><br />
                  {item.name}<br />
                  {item.color}<br />
                  {item.description}<br />
                  {item.price}<br />
                  Quantity: {item.quantity}<br />
                  {/* <Link to={`/cart/edit/${item.id}`}>Edit quantity</Link>*/}
                  <button onClick={this.handleDelete(item.id)}>Remove</button>
                </li><br />
              </div>
            );
          })}
        </ul>
        {/* <Link to="/checkout">Checkout</Link> */}
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
