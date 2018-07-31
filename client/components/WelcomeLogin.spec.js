//Chai test materials
const chai = require('chai')
const expect = chai.expect

//Enzyme test materials
import {shallow} from 'enzyme'
import React from 'react'
import WelcomeLogin from './WelcomeLogin'

describe('WelcomeLogin', () => {
  let welcomeLogin

  beforeEach(() => {
    let currentUser = {
      email: 'testEmail@email.com'
    }

    welcomeLogin = shallow(<WelcomeLogin currentUser={currentUser}/>)
  })

  it('renders a welcome message in a h1', () => {
    expect(welcomeLogin.find('h1').text()).to.be.equal('Welcome testEmail@email.com!')
  })
})
