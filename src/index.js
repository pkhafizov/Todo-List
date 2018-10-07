import React from 'react';
import ReactDom from 'react-dom';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { loadTasks } from './actions/taskActions';
import './styles/styles.scss';
import '../node_modules/bootstrap/scss/bootstrap.scss';

import App from './components/App';

const store = configureStore();
store.dispatch(loadTasks());

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
