
const initialState = {}

const CHANGE_TO_SUCCESS = 'CHANGE_TO_SUCCESS'
const CHANGE_TO_ERROR = 'CHANGE_TO_ERROR'

const makeSuccess = success => ({
  type: CHANGE_TO_SUCCESS,
  success
})

const makeError = error => ({
  type: CHANGE_TO_ERROR,
  error
})

export const toggleSuccess = () => dispatch => {
  try {
    dispatch(makeSuccess('success'));
  } catch (err) {
    console.log(err)
  }
}

export const toggleError = () => dispatch => {
  try {
    dispatch(makeError('error'))
  } catch (err) {
    console.log(err)
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TO_SUCCESS:
      return action.success
    case CHANGE_TO_ERROR:
      return action.error
    default:
      return state
  }
}
