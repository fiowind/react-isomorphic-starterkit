import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';

import configureStore from '../common/store/configureStore';
import { getUser } from '../common/api/user';
import routes from '../common/routes';
import packagejson from '../../package.json';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import { fetchComponentDataBeforeRender } from '../common/api/fetchComponentDataBeforeRender';


import { Router } from 'express'
const serverRenderRouter = new Router();
const config = require('./config'); 

serverRenderRouter.get("*", function (req, res,) {

  console.log('serverRenderRouter');

  const location = req.url;

  getUser(user => {
      if(!user) {
        return res.status(401).end('Not Authorised');
      }
      match({ routes, location:'/', basename:config.appDomain }, (err, redirectLocation, renderProps) => {
        if(err) {
          console.error(err);
          return res.status(500).end('Internal server error');
        }
        if(!renderProps)
          return res.status(404).end('Not found');
          const store = configureStore({user : user, version : packagejson.version});
          const InitialView = (
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
        //This method waits for all render component promises to resolve before returning to browser
        fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
          .then(html => {
            const componentHTML = renderToString(InitialView);
            const initialState = store.getState();
            res.render('index', { 
              html: componentHTML,
              initialState: JSON.stringify(initialState)
            });
            // res.status(200).end(renderFullPage(componentHTML,initialState))
          })
          .catch(err => {
            console.log(err)
            res.end(renderFullPage("",{}))
          });
      });

    }
  )

});


module.exports = serverRenderRouter;