import React from 'react'; // necessary! or can't import from './checkComplete'
import axios from 'axios';
import {fetchSuccess, fetchError} from './checkComplete'

export const createPurchase = purchase => async dispatch => {
  try {
    await axios.post('/api/purchase', purchase)
    dispatch(fetchSuccess())
  } catch (err) {
    console.log(err)
    dispatch(fetchError())
  }
}

// no reducer, action creator, action type necessary? doesn't need to go to state. but we do need all axios requests in redux store.
