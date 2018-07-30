import axios from 'axios';

export const createPurchase = purchase => async () => {
  try {
    await axios.post('/api/purchase', purchase)
  } catch (err) {
    console.log(err)
  }
}

// no reducer, action creator, action type necessary? doesn't need to go to state. but we do need all axios requests in redux store.
