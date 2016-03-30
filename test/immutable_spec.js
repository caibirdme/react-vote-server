/**
 * Created by deenjun on 16/2/13.
 */
import {expect} from 'chai';

describe('immutability', () => {
   function inc(state) {
       return state+1;
   }
   describe('a number', () => {
       it('is immutable', () => {
          let state = 42;
          let nextState = inc(state);
          expect(nextState).to.equal(43);
          expect(state).to.equal(42);
       });
   });
});
