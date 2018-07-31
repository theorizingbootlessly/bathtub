const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const Purchase = require('./purchase')

Cart.belongsTo(User)
User.hasOne(Cart)

Purchase.belongsTo(User)
User.hasMany(Purchase)

//  Cart.belongsTo(Purchase)
//  Purchase.hasOne(Cart)

// ^ for now, I will stringify the cart and put it in the Purchase object. That way if the cart changes because the user comes back to purchase other things, past carts-belonging-to-purchases won't get overwritten. We want purchased carts in stone.

module.exports = {
  User,
  Product,
  Cart
}
