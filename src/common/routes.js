import { Route } from "react-router";
import React from "react";

import App from "./containers/App";

//Redux Smart

import Fio from "./containers/Fio";
import Detail from "./containers/Detail";
import Shop from "./containers/Shop"
import ShopDetail from "./containers/Product"

//Redux Dumb
import HomePage from "./components/Home";
import AboutPage from "./components/About";
import error404 from "./components/404";

export default (
  <Route name="app" path="/" component={App}>
    <Route path="home" component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="fio" component={Fio} />
    <Route path="Detail/:id" component={Detail} />
    <Route path="shop" component={Shop} />
    <Route path="shop/:pid" component={ShopDetail} />
    <Route path="*" component={error404}/>
  </Route>
);
