import axios from 'axios'

const initialState = {
  allDucks: [],
}

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
    dispatch(getDucks(allDucks.data))
  } catch (error) {
    console.log(error)
  }
}

// reducer:
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DUCKS:
      return {...state, allDucks: action.ducks}
    default:
      return state
  }
}

export default productsReducer
