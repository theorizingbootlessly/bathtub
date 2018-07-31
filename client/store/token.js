
const initialState = {}

const CREATE_TOKEN = 'CREATE_TOKEN'

const makeToken = token => ({
  type: CREATE_TOKEN,
  token
})

export const createToken = (id, total) => dispatch => {
  try {
    const token = {id, total};
    dispatch(makeToken(token));
  } catch (err) {
    console.log(err)
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TOKEN:
      return action.token
    default:
      return state
  }
}
