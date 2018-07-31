//Chai test materials
const chai = require('chai')
const expect = chai.expect

//Enzyme test materials
import {shallow} from 'enzyme'
import React from 'react'
import SuccessMessage from './SuccessMessage'

describe('SuccessMessage', () => {
  let sucessMessage

  beforeEach(() => {
    sucessMessage = shallow(<SuccessMessage />)
  })

  it('renders a success message in a div', () => {
    expect(sucessMessage.find('div').text()).to.be.equal('Added Successfully')
  })
})
