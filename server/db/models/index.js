const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const Purchase = require('./purchase')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

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
