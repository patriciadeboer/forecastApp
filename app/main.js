//React
import React from 'react';
import { render } from 'react-dom';
//Redux
import { Provider } from 'react-redux';
import store from './store';
//Components
import Root from './components/root';
import './index.css';

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('main')
);
