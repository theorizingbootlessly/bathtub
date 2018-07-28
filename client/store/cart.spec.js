import { expect } from 'chai';
import { deleteItem, deleteOne } from './cart';

describe('Action-creators', () => {

  describe('deleteItem', () => {
    it('returns properly formatted action', () => {
      const id = 1;
      expect(deleteItem(id)).to.be.deep.equal({
        type: 'DELETE_ITEM_FROM_CART',
        id: id
      });
    });
  });

  describe('deleteOne', () => {
    it('returns properly formatted action', () => {
      const id = 2;
      expect(deleteOne(id)).to.be.deep.equal({
        type: 'DELETE_ONE_DUCK',
        id: id
      });
    });
  })
});

