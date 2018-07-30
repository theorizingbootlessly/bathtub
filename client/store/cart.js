import axios from 'axios'
import history from '../history'

//Constants for action creators
const GET_CART = 'GET_CART'
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART'
const DELETE_ONE_DUCK = 'DELETE_ONE_DUCK'
const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART'

//Dummy data
// const defaultCart = [
//   {
//     id: 7,
//     name: 'Great Duck',
//     description: 'Scientifically the greatest duck',
//     price: 3.99,
//     imgUrl:
//       'https://images-na.ssl-images-amazon.com/images/I/610EksXe52L._AC_UL160_SR160,160_.jpg',
//     quantity: 9
//   },
//   {
//     id: 8,
//     name: 'WonderDuck',
//     description: 'Heroic duck at a heroic price',
//     price: 4.99,
//     imgUrl:
//       'https://images-na.ssl-images-amazon.com/images/I/610EksXe52L._AC_UL160_SR160,160_.jpg',
//     quantity: 8
//   },
//   {
//     id: 9,
//     name: 'Magic Duck',
//     description: 'Magical duck at a magical price',
//     price: 9.99,
//     imgUrl:
//       'https://images-na.ssl-images-amazon.com/images/I/610EksXe52L._AC_UL160_SR160,160_.jpg',
//     quantity: 7
//   }
// ]

//Action creators

const getCart = cart => ({
  type: GET_CART,
  cart
})

// deletes section
export const deleteItem = id => ({
  type: DELETE_ITEM_FROM_CART,
  id
})

// subtracts 1 from quantity in cart for a kind of duck
export const deleteOne = id => ({
  type: DELETE_ONE_DUCK,
  id
})

const updateItem = (id, quantity) => ({
  type: UPDATE_ITEM_IN_CART,
  id,
  quantity
})

//Thunks

export const fetchCart = currentUser => async dispatch => {
  const response = await axios.get(`/api/cart/${currentUser}`)
  console.log('response from thunk', response.data)
}

// export const fetchCart = () => async dispatch => {
//   try {
//     const response = await axios.get(`/api/users/:userOrGuest/cart`)
//     const cart = response.data
//     dispatch(getCart(cart))
//   } catch (err) {
//     console.log(err)
//   }
// }

export const deleteItemFromCart = id => dispatch => {
  try {
    dispatch(deleteItem(id))
  } catch (err) {
    console.log(err)
  }
}

export const deleteOneDuck = id => dispatch => {
  try {
    dispatch(deleteOne(id))
  } catch (err) {
    console.log(err)
  }
}

export const updateItemInCart = (id, quantity) => dispatch => {
  try {
    dispatch(updateItem(id, quantity))
  } catch (err) {
    console.log(err)
  }
}

//Reducer
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case DELETE_ITEM_FROM_CART:
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.id) {
          state.splice(i, 1)
          break
        }
      }
      return state
    case UPDATE_ITEM_IN_CART:
      for (let i = 0; i < state.length; i++) {
        if (state.id === action.id) {
          state.quantity = action.quantity
          break
        }
      }
      return state
    case DELETE_ONE_DUCK:
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.id) {
          state[i].quantity = state[i].quantity - 1
          break
        }
      }
      return state
    default:
      return state
  }
}

export default cartReducer
