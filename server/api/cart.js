const router = require('express').Router()
const {Cart} = require('../db/models')

router.post('/:userOrGuest/cart', async (req, res, next) => {
  try {
    const product = {
      productId: req.body.id
    }

    const cart = await Cart.findAll({
      where: {
        userId: req.params.userOrGuest
      }
    })

    if (!cart || !product) {
      res.sendStatus(404)
    } else {
      // if (user === 'guest') {
      // if (!req.session.cart) {
      //   req.session.cart = [product];
      // } else {
      //   req.session.cart.push(product);
      //   res.status(201).send(product);
      // }
      // }

      await Cart.findOrCreate({
        where: {
          productId: req.body.id,
          quantity: req.body.quantity,
          userId: req.params.userOrGuest
        }
      })
      res.status(201).send(product)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
