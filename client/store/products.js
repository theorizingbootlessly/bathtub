import axios from 'axios'

// action types:
const GET_DUCKS = 'GET_DUCKS'

// action creator:

export const getDucks = ducks => ({
  type: GET_DUCKS,
  ducks
})

// thunk creator:

export const fetchDucks = () => async dispatch => {
  try {
    const allDucks = await axios.get('/api/product')
    console.log(allDucks)
    // console.log(fetchDucks(allDucks.data))
    dispatch(getDucks(allDucks.data))
  } catch (error) {
    console.log(error)
  }
}

// reducer:
const productsReducer = (state = {allDucks: []}, action) => {
  switch (action) {
    case GET_DUCKS:
      return {...state, allDucks: action.ducks}
    default:
      return state
  }
}

export default productsReducer
