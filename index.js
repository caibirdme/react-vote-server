/**
 * Created by deenjun on 16/2/14.
 */
import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);
store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});
