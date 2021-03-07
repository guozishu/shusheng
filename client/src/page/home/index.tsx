import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Hello from './containers/Hello';
import store from './store';

import './index.css';

const styles: React.CSSProperties = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const Root = () => (
  <div style={styles}>
    <Provider store={store}>
      <Hello />
    </Provider>
  </div>
);

render(<Root />, document.getElementById('root') as HTMLElement);
