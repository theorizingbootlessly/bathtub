//Chai test materials
const chai = require('chai')
const expect = chai.expect

//Enzyme test materials
import {shallow} from 'enzyme'
import React from 'react'
import LogIn from './logIn-form'


describe('<LogIn />', () => {
  it('renders a form input for email address', () => {
    //  expect(wrapper).to.be.class
    let wrapper = shallow(<LogIn />)
    expect(wrapper.find('login-form')).exist()
  })
})
