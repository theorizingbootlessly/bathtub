const router = require('express').Router()
const {Cart, Product, User} = require('../db/models')

router.post('/:userId', async (req, res, next) => {
  const userCart = await Cart.findAll({
    where: {
      userId: req.params.userId
    } // eager load option: ?
  })
  res.send(userCart)
})

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

    const itemExists = await Cart.findOne({
      where: {
        productId: req.body.id,
        userId: req.params.userOrGuest
      }
    })

    if (!cart || !product) {
      res.sendStatus(404)
    } else if (itemExists) {
      // if (user === 'guest') {
      // if (!req.session.cart) {
      //   req.session.cart = [product];
      // } else {
      //   req.session.cart.push(product);
      //   res.status(201).send(product);
      // }
      // }
      await itemExists.addToQuantity(req.body.quantity)
    } else {
      await Cart.create({
        productId: req.body.id,
        quantity: req.body.quantity,
        userId: req.params.userOrGuest,
        imgURL: req.body.imgURL,
        name: req.body.name,
        price: req.body.price
      })
      res.status(201).send(product)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
