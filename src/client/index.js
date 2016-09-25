import 'babel-polyfill';

import { render } from 'react-dom'
import React from 'react';
import { Router,useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { syncHistoryWithStore } from 'react-router-redux';


import configureStore from '../common/store/configureStore';
import routes from '../common/routes';

import "../../stylus/main.styl";

const browserHistory = useRouterHistory(createHistory)({
  basename: '/winaward/a'
});

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const myHistory = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
     <Router history={myHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

// if (process.env.NODE_ENV !== 'production') {
//   require('../server/devtools')(store);
// }