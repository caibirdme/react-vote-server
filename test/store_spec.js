/**
 * Created by deenjun on 16/2/14.
 */
import {Map, List} from 'immutable';
import {expect} from 'chai';
import makeStore from '../src/store';

describe('store', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());
    const action = {type: 'SET_ENTRIES', entries: ['Monkey', 'Bear']};
    store.dispatch(action);
    expect(store.getState()).to.equal(Map({
        entries: List.of('Monkey', 'Bear')
    }));
});
