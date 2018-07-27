import axios from 'axios'

const defaultSubtotal = {};

const GET_SUBTOTAL = 'GET_SUBTOTAL';

const getSubtotal = subtotal => ({
  type: GET_SUBTOTAL,
  subtotal
});

export const fetchSubtotal = () => async dispatch => {
  try {
    const response = await axios.get('/:userOrGuest/cart/subtotal');
    const subtotal = response.data;
    // BUT WHAT IF GUEST-SUBTOTAL IS RETURNED BY BACKEND?
    const action = getSubtotal(subtotal);
    dispatch(action);
  } catch (err) {
    console.log(err);
  }
};

const subtotalReducer = (state = defaultSubtotal, action) => {
  switch (action.type) {
    case GET_SUBTOTAL:
      return action.subtotal;
    default:
      return state;
  }
}

export default subtotalReducer;
