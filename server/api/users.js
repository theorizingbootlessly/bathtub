const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let newUser = await User.create(req.body)
    res.json(newUser)
  } catch (err){
    next(err)
  }
})

// ADD TO CART
router.post('/:userOrGuest/cart', async (req, res, next) => {
  try {
    const product = req.body;
    const user = req.params.userOrGuest;
    if (!user || !product) {
      res.sendStatus(404);
    }
    // if (user === 'guest') {
      // if (!req.session.cart) {
      //   req.session.cart = [product];
      // } else {
      //   req.session.cart.push(product);
      //   res.status(201).send(product);
      // }
    // } else {
    await user.addToCart(product);
    res.status(201).send(product);
  } catch (err) {
    next(err);
  }
});

// GET SUBTOTAL
router.get('/:userOrGuest/cart/subtotal', async (req, res, next) => {
  try {
    const user = req.params.userOrGuest;
    if (user && user !== 'guest') {
      const subtotal = await user.getSubtotal();
      res.status(200).send(subtotal);
    } else if (user === 'guest') {
      res.status(200).send('guest-subtotal');
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});
