/**
 * Created by deenjun on 16/2/13.
 */
import {List,Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
    describe('setEntries', () => {
        it('adds the entries to the state', () => {
            const state = Map();
            const entries = ['Monkey', 'Bear'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Monkey', 'Bear')
            }));
        });
    });

    describe('next vote', () => {
        it('takes next two enrtries under vote', () => {
            const state = Map({
                entries: List.of('Monkey', 'Bear', 'Dog')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Monkey', 'Bear')
                }),
                entries: List.of('Dog')
            }));
        });

        it('puts winner of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Monkey', 'Bear'),
                    tally: Map({
                        Monkey: 4,
                        Bear: 2
                    })
                }),
                entries: List.of('Elephant', 'Delphi', 'Shark')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Elephant', 'Delphi')
                }),
                entries: List.of('Shark', 'Monkey')
            }));
        });

        it('puts both of tied vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Monkey', 'Bear'),
                    tally: Map({
                        Monkey: 3,
                        Bear: 3
                    })
                }),
                entries: List.of('Elephant', 'Delphi', 'Shark')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Elephant', 'Delphi')
                }),
                entries: List.of('Shark', 'Monkey', 'Bear')
            }));
        });

        it('marks winner when just one entry left', () => {
           const state = Map({
               vote: Map({
                   pair: List.of('Monkey', 'Bear'),
                   tally: Map({
                       Monkey: 4,
                       Bear: 2
                   })
               }),
               entries: List()
           });
           const nextState = next(state);
           expect(nextState).to.equal(Map({
               winner: 'Monkey'
           }));
        });

    });

    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Monkey', 'Bear')
            });
            const nextState = vote(state, 'Monkey');
            expect(nextState).to.equal(Map({
                pair: List.of('Monkey', 'Bear'),
                tally: Map({
                    Monkey: 1
                })
            }));
        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Monkey', 'Bear'),
                tally: Map({
                    Monkey: 4,
                    Bear: 2
                })
            });
            const nextState = vote(state, 'Bear');
            expect(nextState).to.equal(Map({
                pair: List.of('Monkey', 'Bear'),
                tally: Map({
                    Monkey: 4,
                    Bear: 3
                })
            }));
        });
    });

});
