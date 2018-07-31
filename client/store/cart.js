import axios from 'axios'
import history from '../history'

//Constants for action creators
const GET_CART = 'GET_CART'
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART'
const DELETE_ONE_DUCK = 'DELETE_ONE_DUCK'
const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART'


//Action creators

const getCart = cart => {
  return {
  type: GET_CART,
  cart
  }
}

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
export const renderCart = userId => async dispatch => {
  try {
    const response = await axios.post(`/api/cart/${userId}`)
    dispatch(getCart(response.data))
  } catch (err) {
    console.log(err)
  }
}

export const renderGuestCart = () => async dispatch => {
  try{
    //Grabs product and quantity from session data
    const productIdAndQuant = await axios.get('/api/cart/guest')
    let productIds = Object.keys(productIdAndQuant.data)
    let product
    let products = []

    //Gets products from product model based on session data
    productIds.forEach((item) => {
       product =  axios.get(`/api/product/${(item)}`)
       products.push(product)
      })
    
    let productsArr = await Promise.all(products)
    let final = productsArr.map((productstuff) => {
      return productstuff.data
    })

    //Matches up quantity correctly
    final.forEach((duck) => {
      duck.quantity = productIdAndQuant.data[duck.id]
    })

    dispatch(getCart(final))
  } catch(err) {
    console.log(err)
  }
}

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
