const Sequelize = require('sequelize')
const db = require('../db')

const {STRING, TEXT} = Sequelize

const Purchase = db.define('purchase', {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cart: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Purchase
