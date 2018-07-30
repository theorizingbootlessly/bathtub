const router = require('express').Router()
const {User} = require('../db/models')
const stripe = require("stripe")("sk_test_TwTTlid3GeOG6YPydOjARw4I");
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

router.get('/:userID', async (req, res, next) => {
  try {
    let result = await User.findOne({where: {id: req.params.userID}})
    res.json(result)
  } catch (err){
    console.log(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let newUser = await User.create(req.body)
    req.login(newUser, err => (err ? next(err) : res.json(newUser)))
  } catch (err){
    next(err)
  }
})

router.post("/charge", async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});
