const router = require('express').Router()
const Purchase = require('../db/models/purchase')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const newPurchase = await Purchase.create(req.body);
    res.status(201).send(newPurchase);
  } catch (err) {
    next(err);
  }
});
