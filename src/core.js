/**
 * Created by deenjun on 16/2/13.
 */
import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

const getWinner = vote => {
  if(!vote) {
      return [];
  }
  const [a, b] = vote.get('pair');
  const valuesA = vote.getIn(['tally', a], 0);
  const valuesB = vote.getIn(['tally', b], 0);
  if(valuesA > valuesB) {
      return [a];
  } else if(valuesA < valuesB) {
      return [b];
  } else {
      return [a, b];
  }
};

export function next(state) {
    const entries = state.get('entries')
                         .concat(getWinner(state.get('vote')));
    /*
    * why not just return a new Map?
    * We don't known if the state has any other unrelated data
    if(entries.size === 1) {
        return Map({
            winner: entries.last()
        });
    }
    */
    if(entries.size === 1) {
        return state.remove('entries').remove('vote').set('winner', entries.first());
    }
    return state.merge({
        vote: Map({
            pair: entries.take(2)
        }),
        entries: entries.skip(2)
    });
}

export function vote(voteState, entry) {
    return voteState.updateIn(
        ['tally', entry],
        0,
        tally => tally+1
    );
}
