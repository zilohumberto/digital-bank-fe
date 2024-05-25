import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './reducers/authReducer';
import transferReducer from './reducers/transferReducer';
import accountsReducer from './reducers/accountsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  transfer: transferReducer,
  accounts: accountsReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
