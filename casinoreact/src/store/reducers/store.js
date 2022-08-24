import { createStore } from 'redux';
import reducer from './cards.js';

const store = createStore(reducer);

export default store;