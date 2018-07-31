const router = require('express').Router()
const {Cart, Product, User} = require('../db/models')

// route for rendering Cart items
router.post('/:userId', async (req, res, next) => {
  try {
    const userCart = await Cart.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.send(userCart)
  } catch (error) {
    console.log('error in render cart route')
  }
})

// route for updating quantity of cart item

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    if (req.body.quantity === 1) {
      await Cart.destroy({
        where: {
          userId: req.params.userId,
          productId: req.params.productId,
          quantity: 1
        }
      })
    }
    const findByUserId = await Cart.findAll({
      where: {
        userId: req.params.userId
      }
    })

    await Cart.update(
      {
        quantity: req.body.quantity - 1
      },
      {
        where: {
          userId: req.params.userId,
          productId: req.params.productId
        }
      }
    )

    res.json(findByUserId)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:userId/:productId', async (req, res, next) => {
  try {
    const updatedCart = await Cart.findAll({
      where: {
        userId: req.params.userId
      }
    })
    const destroyItem = await Cart.destroy({
      where: {
        userId: req.params.userId,
        productId: req.params.productId
      }
    })
    console.log(' updated cart', updatedCart)
    res.send(updatedCart)
  } catch (error) {
    next(error)
  }
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
