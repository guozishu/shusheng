import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Hello from './containers/Hello';
import store from './store';

import './index.css';

const Root = () => (
  <div className={'container'}>
    <Provider store={store}>
      <Hello />
    </Provider>
  </div>
);

render(<Root />, document.getElementById('root'));
