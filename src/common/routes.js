import { Route,IndexRoute } from "react-router";
import React from "react";

import App from "./containers/App";

//Redux Smart
import Home from "./containers/Home";
import RankPage from "./containers/RankPage";
import UserInvite from './containers/invite';

//Redux Dumb
import error404 from "./pages/404";
import Product from './pages/product';
import Success from './pages/success';
import MailPage from './pages/mail';

import Test from './pages/test';

export default (
  <Route name="app" path="/" component={App}>
    <IndexRoute components={Home} />
    <Route path="home" component={Home} />
    <Route path="product/:pid" component={Product} />
    <Route path="rank" component={RankPage} />
    <Route path="success" component={Success}/>
    <Route path="userinvite/:uid" component={UserInvite}/>
    <Route path="mail" component={MailPage}/>
    <Route path="winaward/a" component={Test}>
        <IndexRoute components={Home} />
        <Route path="home" component={Home} />
        <Route path="product/:pid" component={Product} />
        <Route path="rank" component={RankPage} />
        <Route path="success" component={Success}/>
        <Route path="userinvite/:uid" component={UserInvite}/>
        <Route path="mail" component={MailPage}/>
        <Route path="*" component={error404}/>
    </Route>
    <Route path="*" component={error404}/>

  </Route>
);