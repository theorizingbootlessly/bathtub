const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')


describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/product', () => {

    beforeEach(() => {
      return Product.create({
        name: 'Bill Nye the science duck',
        description: 'Bill Bill Bill Bill!',
        color: 'yellow',
        price: 2.99
      })
    })

    it('should return an array of products', async () => {
      const res = await request(app)
        .get('/api/product')
        .expect(200)

      expect(res.body).to.be.an('array')
    })

    it('name should be a string', async () => {
      const res = await request(app)
        .get('/api/product')
        .expect(200)

        expect(res.body[0].name).to.be.equal('Bill Nye the science duck')
    })

    it('price should be a number', async () => {
      const res = await request(app)
        .get('/api/product')

        expect(res.body[0].id).to.be.a('number')
    })
  })
})
