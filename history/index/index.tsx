import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './containers/Hello';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';
import configureStore from "./store";

import './index.css';

// const store = createStore<StoreState>(enthusiasm, {
//   enthusiasmLevel: 1,
//   languageName: 'TypeScript',
// });

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
