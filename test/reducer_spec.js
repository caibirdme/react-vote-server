/**
 * Created by deenjun on 16/2/14.
 */
import {Map, List} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const state = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Monkey', 'Bear']};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            entries: List.of('Monkey', 'Bear')
        }));
    });

    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['Monkey']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(Map({
            entries: List.of('Monkey')
        }));
    });

    it('handles NEXT', () => {
        const state = Map({
            entries: List.of('Monkey', 'Bear')
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            vote: Map({
                pair: List.of('Monkey', 'Bear')
            }),
            entries: List()
        }));
    });

    it('handles VOTE', () => {
        const state = Map({
            vote: Map({
                pair: List.of('Monkey', 'Bear')
            }),
            entries: List()
        });
        const action = {type: 'VOTE', entry: 'Bear'};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            vote: Map({
                pair: List.of('Monkey', 'Bear'),
                tally: Map({
                    Bear: 1
                })
            }),
            entries: List()
        }));
    });

    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Monkey', 'Bear']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Monkey'},
            {type: 'VOTE', entry: 'Monkey'},
            {type: 'VOTE', entry: 'Bear'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());
        expect(finalState).to.equal(Map({
            winner: 'Monkey'
        }));
    });
});
