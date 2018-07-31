/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Sequelize = require('sequelize')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('model properties', () => {
    let cody 

    beforeEach(async () => {
     cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones',
      })
    })

      it ('returns true if user model has an email property', () => {
        
        expect(cody).to.have.property('email')
      })

      it ('returns true if user model has a password property', () => {
        
        expect(cody).to.have.property('password')
      })

      it ('returns true if user model has salt property', () => {
        
        expect(cody).to.have.property('salt')
      })

      it ('returns true if user model has googleId property', () => {
        
        expect(cody).to.have.property('googleId')
      })

    })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')

    describe('addToCart', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it ('returns true if model has addToCart instance method', () => {
          expect(cody.addToCart).to.be.a('function')
        })

      })
  }) // end describe('instanceMethods')

  describe('class methods', () => {
    describe('generateSalt', () => {
      
      it('returns true if generateSalt is a function', () => {
        expect(User.generateSalt).to.be.a('function')
      })

      it('returns true if generateSalt returns a string', () => {
        expect(User.generateSalt()).to.be.a('string')
      })

    })

    describe('encryptPassword', () => {

      it('returns true if encryptPassword is a function', () => {
        expect(User.encryptPassword).to.be.a('function')
      })

      it('returns true if it has two arguments', () => {
        expect(User.encryptPassword).to.be.lengthOf(2)
      })
    })

  })//end describe('classMethods)

  describe('hooks', () => {
    describe('setSaltAndPassword', () => {

      it('returns true if it setSaltAndPassword is a function', () => {
        expect(User.generateSalt).to.be.a('function')
      })

      it('returns true setSaltAndPassword returns a string', () => {
        expect(User.generateSalt()).to.be.a('string')
      })

    })
  })
}) // end describe('User model')
