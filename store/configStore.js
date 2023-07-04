import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk" 
import authReducer from './reducers/AuthReducer';
import resetPasswordReducer from './reducers/ResetPasswordReducer';

const rootReducer = combineReducers({
    auth:authReducer,
    resetPassword:resetPasswordReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk) );
