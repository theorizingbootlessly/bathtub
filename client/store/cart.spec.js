import { expect } from 'chai';
import { deleteItem, deleteOne, cartReducer as reducer } from './cart';
import { createStore } from 'redux';

const ducks = [
  {id: 7, name: 'Great Duck', description: 'Scientifically the greatest duck', price: 3.99, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/610EksXe52L._AC_UL160_SR160,160_.jpg', quantity: 9},
  {id: 8, name: 'WonderDuck', description: 'Heroic duck at a heroic price', price: 4.99, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/610EksXe52L._AC_UL160_SR160,160_.jpg', quantity: 8},
  {id: 9, name: 'Magic Duck', description: 'Magical duck at a magical price', price: 9.99, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/610EksXe52L._AC_UL160_SR160,160_.jpg', quantity: 7}
]

function getRandomCartItem (ducks) {
  return ducks[Math.floor(Math.random() * ducks.length)]
}

describe('Action-creators', () => {

  describe('deleteItem', () => {
    it('returns properly formatted action', () => {
      const id = 1;
      expect(deleteItem(id)).to.be.deep.equal({
        type: 'DELETE_ITEM_FROM_CART',
        item: id
      });
    });
  });

  describe('deleteOne', () => {
    it('returns properly formatted action', () => {
      const id = 2;
      expect(deleteOne(id)).to.be.deep.equal({
        type: 'DELETE_ONE_DUCK',
        items: id
      });
    });
  })
});
