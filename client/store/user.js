import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GET_USERS = 'GET_USERS'
const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  users: [],
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const getUsers = users =>({type: GET_USERS, users})
const removeUser = () => ({type: REMOVE_USER})
const addUser = (user) => ({type: ADD_USER, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    console.log('get to website user', res.data)
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const users = () => async dispatch => {
  try {
    const result = await axios.get('/api/users')
    const allUsers = result.data
    const action = getUsers(allUsers)
    dispatch(action)

  } catch (err){
    console.log(err)
  }
}

export const add_user = (user) => async dispatch => {
  try {
    const result = await axios.post('/api/users', user)
    const newUser = result.data
    const action = addUser(newUser)
    dispatch(action)
  } catch (err){
    console.log(err)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return initialState
    case GET_USERS:
      return {...state, users: action.users}
    case ADD_USER:
      return {...state, users: [...state.users, action.user]}
    default:
      return state
  }
}
