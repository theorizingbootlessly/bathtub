//Chai test materials
const chai = require('chai')
const expect = chai.expect

//Enzyme test materials
import {shallow} from 'enzyme'
import React from 'react'
import {LogIn} from './logIn-form'


describe('Login', () => {

  let login

  beforeEach(() => {
    login = shallow(<LogIn />)
  })

  it('should have an email state', () => {

     const email = login.state().email
     expect(email).to.deep.equal('')
  })

  it('should have a password state', () => {
    const password = login.state().password
    expect(password).to.deep.equal('')
  })
})
