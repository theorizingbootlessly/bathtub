const initialState = {}

const RENDER_SUCCESS = 'RENDER_SUCCESS'
const RENDER_ERROR = 'RENDER_ERROR'
const CLEAR_CHECK_COMPLETE = 'CLEAR_CHECK_COMPLETE'

const clearState = blank => ({
  type: CLEAR_CHECK_COMPLETE,
  blank
})

const getSuccess = success => ({
  type: RENDER_SUCCESS,
  success
})

const getError = error => ({
  type: RENDER_ERROR,
  error
})

export const fetchSuccess = () => dispatch => {
  try {
    dispatch(getSuccess('success'))
  } catch (err) {
    console.log(err)
  }
}

export const fetchError = () => dispatch => {
  try {
    dispatch(getError('error'))
  } catch (err) {
    console.log(err)
  }
}

export const clearCheckComplete = () => dispatch => {
  try {
    dispatch(clearState(''))
  } catch (err) {
    console.log(err)
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RENDER_SUCCESS:
      return action.success
    case RENDER_ERROR:
      return action.error
    case CLEAR_CHECK_COMPLETE:
      return action.blank
    default:
      return state
  }
}
