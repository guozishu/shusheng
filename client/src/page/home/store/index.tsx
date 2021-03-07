import { createStore, applyMiddleware } from 'redux';

import { enthusiasm } from '../reducers/index';

// create store
const store = createStore(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
});


// export store singleton instance
export default store;

