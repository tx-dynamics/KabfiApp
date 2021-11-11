import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer'


const rootReducers = combineReducers({ AuthReducer: AuthReducer });


export default rootReducers