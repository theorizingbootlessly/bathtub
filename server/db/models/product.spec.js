const {expect} = require('chai')
const Product = require('./product')



describe('The `Product` model', () => {

  let product;

  beforeEach(() => {
      product = Product.build({
      name: 'Special Duck',
      color: 'green',
      price: 2,
      quantity: 1,
      description: 'This is a very special duck',
    })
  });

     it('fails to validate if there is no name', () => {
       product.name = null

       return product.validate()
      .then(() => {
        throw new Error('validation should fail when name is null');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
      });
     })

     it('fails to validate if there is no price', () => {
      product.price = null

      return product.validate()
     .then(() => {
       throw new Error('validation should fail when price is null');
     },
     (result) => {
       expect(result).to.be.an.instanceOf(Error);
     });
    })

    it('fails to validate if there is no description', () => {
      product.description = null

      return product.validate()
     .then(() => {
       throw new Error('validation should fail when description is null');
     },
     (result) => {
       expect(result).to.be.an.instanceOf(Error);
     });
    })

    it('sets default value of quantity to 0 if none is set', () => {

      const newProduct = Product.build({
        name: 'Special Duck',
        color: 'green',
        price: 2,
        description: 'This is a very special duck',
      })
      expect(newProduct.quantity).to.equal(0)
    })

    it('generates an imageURL if there is none', () => {

      expect(product.imgURL.length).to.not.equal(0)
      })
    })
