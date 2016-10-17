import { Route } from "react-router";
import React from "react";

import App from "./containers/App";

//Redux Smart

import Fio from "./containers/Fio";
import Detail from "./containers/Detail";
// import Shop from "./containers/Shop"
import ShopDetail from "./containers/Product"

//Redux Dumb
import HomePage from "./components/Home";
// import AboutPage from "./components/About";
import error404 from "./components/404";

if (typeof require.ensure !== 'function') {
 require.ensure = (d, c) => c(require)
}

export default (
  <Route name="app" path="/" component={App}>
    <Route path="home" component={HomePage} />
    <Route path="about" getComponent={(location, cb) => {
    require.ensure([], (require) => {
      cb(null, require('./components/About').default)
    })
  }} />
    <Route path="fio" component={Fio} />
    <Route path="Detail/:id" component={Detail} />
    <Route path="shop" getComponent={(location, cb) => {
    require.ensure([], (require) => {
      cb(null, require('./containers/Shop').default)
    })
  }} />
    <Route path="shop/:pid" component={ShopDetail} />
    <Route path="*" component={error404}/>
  </Route>
);
