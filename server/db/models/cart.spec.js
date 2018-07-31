const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')
const Sequelize = require('sequelize')

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('model properties', () => {
    let cart

    beforeEach(async () => {
      cart = await Cart.create({
        productId: 1,
        imgURL: "https://images-na.ssl-images-amazon.com/images/I/514yK7yFnoL._SL1001_.jpg"
      })
    })

    it ('returns true if model has productId', () => {
      expect(cart).to.have.property('productId')
    })

    it ('returns true if model has quantity', () => {
      expect(cart).to.have.property('quantity')
    })

    it ('returns true if model has name', () => {
      expect(cart).to.have.property('name')
    })

    it ('returns true if model has price', () => {
      expect(cart).to.have.property('price')
    })

    it ('returns true if model has imgURL', () => {
      expect(cart).to.have.property('imgURL')
    })

    it ('returns true if model has userId', () => {
      expect(cart).to.have.property('userId')
    })
  })//end describe(modelProperties)

  describe('instance methods', () => {
    let cart

    beforeEach(async () => {
      cart = await Cart.create({
        productId: 1,
        imgURL: "https://images-na.ssl-images-amazon.com/images/I/514yK7yFnoL._SL1001_.jpg"
      })
    })

    it('returns true if model has addToQuantity function', () => {
      expect(cart.addToQuantity).to.be.a('function')
    })

  })// end describe(instanceMethods)
})