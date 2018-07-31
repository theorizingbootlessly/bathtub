const router = require('express').Router()
const {Cart} = require('../db/models')

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
    next(error)
  }
})

router.delete('/guest/:item', (req, res, next) => {
  const itemTodelete = req.params.item
  delete req.session.cart[itemTodelete]
  res.send(req.session.cart)
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


router.post('/', (req, res, next) => {
  if (req.body.buyerId === 'sessionId') {
    addToCartSession(req, res, next)
  } else {
    addToCartUser(req, res, next)
  }
})
      
router.get('/guest', (req, res, next) => {
  res.send(req.session.cart)
})



router.delete('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId
      }
    })
    await cart.destroy()
    res.status(204).send([])
  } catch (err) {
    next(err)
  }
})

function addToCartSession(req, res, next) {
  //Check Session Cart
  const body = req.body
  let cart
  if (!body.productId) {
    res.sendStatus(404)
  } else if (req.session.cart) {
    if (req.session.cart[body.productId] === undefined) {
      req.session.cart[body.productId] = Number(body.quantity)
    } else {
      req.session.cart[body.productId] += Number(body.quantity)
    }
  } else {
    cart = req.session.cart
      ? req.session.cart
      : {[body.productId]: body.quantity}
    req.session.cart = cart
  }
  res.status(201).send(cart)
}

async function addToCartUser(req, res, next) {
  try {
    //Variables
    const body = req.body
    const product = {
      productId: body.productId
    }
    const itemExists = await Cart.findOne({
      where: {
        productId: body.productId,
        userId: body.buyerId
      }
    })

    //Logic
    if (!product) {
      res.sendStatus(404)
    } else if (itemExists) {
      await itemExists.addToQuantity(body.quantity)
    } else {
      await Cart.create({
        productId: body.productId,
        quantity: body.quantity,
        userId: body.buyerId,
        imgURL: body.imgURL,
        name: body.name,
        price: body.price
      })
      res.status(201).send(product)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = router
