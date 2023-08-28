// store.js
import { createStore } from 'redux';
import sessionReducer from './reducers';

const store = createStore(sessionReducer);

export default store;
