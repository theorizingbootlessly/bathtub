const router = require('express').Router()
const {Product} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // console.log(Product)
    const allProducts = await Product.findAll()
    res.send(allProducts)
  } catch (error) {
    next(error)
  }
})

router.get('/:item', async (req, res, next) => {
  try{
    const product = await Product.findOne({
      where:{
        id: req.params.item
      }
    })
    res.status(200).send(product)
  } catch(err) {
    next(err)
  }
})