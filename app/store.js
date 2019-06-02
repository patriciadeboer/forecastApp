import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import appReducer from './redux'

const store = createStore(
  appReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;
