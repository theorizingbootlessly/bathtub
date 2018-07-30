const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  productId: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

//Instance Methods
Cart.prototype.addToQuantity = async function(num) {
  const currentQuant = this.getDataValue('quantity')
  const newQuant = currentQuant + Number(num)
  await this.update({quantity: newQuant})
}

module.exports = Cart
