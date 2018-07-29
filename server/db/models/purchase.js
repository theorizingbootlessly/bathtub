const Sequelize = require('sequelize')
const db = require('../db')

const { STRING } = Sequelize;

const Purchase = db.define('purchase', {
  date: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  firstName: {
    type: STRING,
    allowNull: false
  },
  lastName: {
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
  }
});

module.exports = Purchase
