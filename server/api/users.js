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
    // console.log(req.session)
    console.log('original cart2', req.session.cookie)
      let cart = (req.session.cookie.cart ? req.session.cooke.cart : [])
      req.session.cookie.cart = cart
      // console.log('user', user)
      // req.session.cart = {testCart: 'cart'}
      console.log('cookie', req.session.cookie)
    res.json(newUser)
  } catch (err){
    console.log(err)
  }
})

router.get('/email/cart', (req, res, next) => { // not :email or ${email} because getting same data for now
  try {
    // const user = await User.findById(req.params.email);
    // const cart = await user.getCart(); // to figure out later -- SESSION
    res.status(200).send([

    ]/*cart*/);
  } catch (err) {
    next(err);
  }
});
