import React from 'react';
import { reducer } from '../client/store';
import { createStore } from 'redux';

describe('Reducer', () => {
  it('returns the initial state by default', () => {
    const store = createStore(reducer)
    expect(store.getState().user).to.be.an('object');
    expect(store.getState().cart).to.be.an('array');
    expect(store.getState().products).to.be.an('array');
  });
});
