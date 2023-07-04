import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk" 
import authReducer from './reducers/AuthReducer';

const rootReducer = combineReducers({
    auth:authReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk) );
