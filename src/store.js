/**
 * Created by deenjun on 16/2/14.
 */
import {createStore, combineReducers} from 'redux';
import reducer from './reducer';

export default function makeStore() {
    return createStore(reducer);
}