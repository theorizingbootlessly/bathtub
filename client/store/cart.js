import axios from 'axios'
import history from '../history'

//Constants for action creators
const GET_CART = 'GET_CART'
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART'
const DELETE_ONE_DUCK = 'DELETE_ONE_DUCK'
const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART'

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
export const deleteOne = items => ({
  type: DELETE_ONE_DUCK,
  items
})

const updateItem = (id, quantity) => ({
  type: UPDATE_ITEM_IN_CART,
  id,
  quantity
})

//Thunks

export const renderCart = currentUser => async dispatch => {
  const response = await axios.post(`/api/cart/${currentUser}`)
  dispatch(getCart(response.data))
}

// export const fetchCart = userId => async dispatch => {
//   try {
//     const response = await axios.get(`/api/users/${userId}`)
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

export const deleteOneDuck = item => async dispatch => {
  try {
    const updateCartById = await axios.put(
      `/api/cart/${item.userId}/${item.productId}`,
      item
    )
    dispatch(deleteOne(updateCartById.data))
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
      // for (let i = 0; i < state.length; i++) {
      //   console.log('state', state[i])
      //   console.log('state', action.items[i])
      //   if (state[i].quantity !== action.items[i].quantity) {
      //     console.log('need to change')
      //   }
      // }
      return action.items
    default:
      return state
  }
}

export default cartReducer
