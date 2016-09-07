import 'babel-polyfill';

import { render } from 'react-dom'
import React from 'react';
import { Router,browserHistory,RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';


import configureStore from '../common/store/configureStore';
import routes from '../common/routes';

import "../../styles/index.css";


const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
     <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);

// if (process.env.NODE_ENV !== 'production') {
//   require('../server/devtools')(store);
// }