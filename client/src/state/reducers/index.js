import {combineReducers} from 'redux';
import data_reducer from './datareducer';
import loginreducer from './loginreducer';

// isko use karte h when we have more than one reducer it helps to export all of them at once
const reducers = combineReducers({
    auth : loginreducer,
    data:data_reducer

})
export default reducers