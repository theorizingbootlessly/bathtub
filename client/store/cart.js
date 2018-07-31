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
export const deleteItem = item => ({
  type: DELETE_ITEM_FROM_CART,
  item
})

// subtracts 1 from quantity in cart for a kind of duck
export const deleteOne = items => ({
  type: DELETE_ONE_DUCK,
  items
})
export const editQuantity = newQuantity => ({
  type: UPDATE_ITEM_IN_CART,
  newQuantity
})

//Thunks
export const updateQuantity = updatedState => async dispatch => {
  try {
    console.log('here in updating', updatedState)
    const {data} = await axios.put(
      `/api/cart/${updatedState.item.userId}/${updatedState.item.productId}/${
        updatedState.newQuantity
      }`
    )
    dispatch(getCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const renderCart = userId => async dispatch => {
  try {
    const response = await axios.post(`/api/cart/${userId}`)
    dispatch(getCart(response.data))
  } catch (err) {
    console.log(err)
  }
}

export const renderGuestCart = () => async dispatch => {
  try {
    //Grabs product and quantity from session data
    const productIdAndQuant = await axios.get('/api/cart/guest')
    let productIds = Object.keys(productIdAndQuant.data)
    let product
    let products = []

    //Gets products from product model based on session data
    productIds.forEach(item => {
      product = axios.get(`/api/product/${item}`)
      products.push(product)
    })
    let productsArr = await Promise.all(products)
    let final = productsArr.map(productstuff => {
      return productstuff.data
    })

    //Matches up quantity correctly
    final.forEach(duck => {
      duck.quantity = productIdAndQuant.data[duck.id]
    })

    dispatch(getCart(final))
  } catch (err) {
    console.log(err)
  }
}

export const deleteItemFromCart = item => async dispatch => {
  try {
    const {data} = await axios.delete(
      `/api/cart/${item.userId}/${item.productId}`
    )
    const deletedData = data.filter(
      updatedCartItem => item.name !== updatedCartItem.name
    )
    dispatch(deleteItem(deletedData))
  } catch (err) {
    console.log(err)
  }
}

export const deleteOneDuck = item => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/cart/${item.userId}/${item.productId}`,
      item
    )
    const updateQuantity = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === item.name) {
        data[i].quantity--
      }
      updateQuantity.push(data[i])
    }
    dispatch(deleteOne(updateQuantity))
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
const cartReducer = (state = {cartItems: []}, action) => {
  switch (action.type) {
    case GET_CART:
      return {...state, cartItems: action.cart}
    case DELETE_ITEM_FROM_CART:
      return {...state, cartItems: action.item}
    case UPDATE_ITEM_IN_CART:
      for (let i = 0; i < state.length; i++) {
        if (state.id === action.id) {
          state.quantity = action.quantity
          break
        }
      }
      return state
    case DELETE_ONE_DUCK:
      return {...state, cartItems: action.items}
    default:
      return state
  }
}

export default cartReducer
