const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  imgURL: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiw852UgbvcAhXPMd8KHW6-BGIQjRx6BAgBEAU&url=https%3A%2F%2Fwww.pinterest.com%2Fsanchy12%2Frubber-ducks%2F&psig=AOvVaw3joxK_XQ8yv07UcoJwaIe6&ust=1532634120126467'
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})
