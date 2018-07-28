import React from 'react';
import { reducer } from './index.js';
import { createStore } from 'redux'
import { expect } from 'chai'

describe('Reducer', () => {
  it('returns the initial state by default', () => {
    const store = createStore(reducer)
    expect(store.getState().user).to.be.an('object');
    expect(store.getState().cart).to.be.an('array');
    expect(store.getState().products.allDucks).to.be.an('array');
  });
});
