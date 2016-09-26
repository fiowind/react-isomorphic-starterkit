import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import apiroutes from './routes';
import serverRender from './serverRender';

const config = require('./config'); 
const appId = config.appId;
const drHost = config.drHost;
const helper = require('./helper');

const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const request =  require('request');
const compression = require('compression')
const uuid = require('node-uuid');

app.enable('trust proxy');
app.use(compression());
app.use(cookieParser());

app.use(function(req, res, next){
    if(req.path === config.appDomain + '/internal/status'){
      return res.end('UP');
    }
    if(req.cookies.appId !== appId){
      res.cookie('appId', appId);
    }
    if(req.cookies.drHost !== drHost){
      res.cookie('drHost', drHost);
    }
    next();
})




if(process.env.NODE_ENV !== 'production'){
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(config.appDomain+'/static', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const UATYPE = {
  WEIBO:'WEIBO',
  WECHAT:'WEIXIN',
  QQ:'QQ'
};


function requestOauthUrl(req, res) {
  console.log('request oauth url :', req.oauth_url);
  //request(config.oauth_authorization_url + '?appUserType=4&redirectUrl=' + encodeURIComponent(helper.getFullUrl(req)), function(err, response, body) {
  request(req.oauth_url + '?redirectUrl=' + encodeURIComponent(helper.getFullUrl(req)), function(err, response, body) {
    console.log('called from oauth_authorization_url with :', body);
    try {
      var rsp = JSON.parse(body);
      if (!rsp.errorcode) {
        console.log('oath authorization url:', rsp.url);

        res.cookie('state', rsp.state, {
          domain: config.cookieDomain || '.youqiantu.com',
          secure: false,
          expires: new Date(Date.now() + 1000 * 60 * 5), // 五分钟
          httpOnly: true });
        res.redirect(rsp.url);
      }
    }
    catch(e){
      console.log(e);
      return res.end('request oauth_authorization_url error');
    }
  });
};


app.use(function(req, res, next) {
  var ua = req.get('User-Agent') || '';
  var referer = req.get('Referer') || '';

  console.log('user-agent:', ua);
  if(/micromessenger/.test((ua.toLowerCase()))){
    req.agentType = UATYPE.WECHAT;
  }
  else if(/weibo/.test((ua.toLowerCase()))){
    req.agentType = UATYPE.WEIBO;
  }
  else if(/qq/.test((ua.toLowerCase()))){
    req.agentType = UATYPE.QQ;
  }
  else {
    return next();
  }

  // 首先拿查看query里面的token,如果没有看cookie里面的token, 主要目的在于兼容callback
  var yqt_token  = req.cookies.yqt_token;
  console.log('req cookie:', req.cookies);

  var fp = req.cookies.fp;
  if (!fp) {
    fp = uuid();
    res.cookie('fp', fp, { expires: new Date(Date.now() * 2), domain: config.cookieDomain || '.youqiantu.com' , httpOnly:false});
  }

  if(req.query.refuid && req.cookies.refuid != req.query.refuid){
    res.cookie('refuid', req.query.refuid, { domain: config.cookieDomain || '.youqiantu.com', httpOnly: false});
  }

  if(req.query.cid && req.cookies.cid != req.query.cid){
    res.cookie('cid', req.query.cid, { domain: config.cookieDomain || '.youqiantu.com', httpOnly:false});
  }

  console.log('request url:', req.originalUrl);

  var eid = uuid();
  if (yqt_token) {
    var uid = yqt_token.split("|")[0] || "";
    var isNewUser = false;
    console.log('req query: ', req.query);
    if (req.query && req.query.newUser == 1) {
      isNewUser = true;
    }

    console.log('is new user: ', isNewUser);

  }

  if(req.agentType === UATYPE.WECHAT){
    req.oauth_url = config.oauth_authorization_url;
  }
  else if(req.agentType === UATYPE.WEIBO) {
    req.oauth_url = config.weibo_authorization_url;
  }
  else if(req.agentType === UATYPE.QQ) {
    req.oauth_url = config.qq_authorization_url;
  }

  if(!yqt_token){
    requestOauthUrl(req, res);
  }
  else{ //verify token info\
    request(config.authentication_url + '?token=' + yqt_token, function(err, response) {
      if (err) return next(err);
      try {
        response = JSON.parse(response.body);
        console.log('response from authentication: ', response);
        if(response.user) {
          res.cookie('nickname', response.user.nickname);

          //  "avatarUrlLarge": "/avatar/000/000/342/1470300985159_512x512.jpg",
          //  "avatarUrlNormal": "/avatar/000/000/342/1470300985159_256x256.jpg",
          //  "avatarUrlSmall": "/avatar/000/000/342/1470300985159_64x64.jpg"
          res.cookie('headimgurl', config.yqtcdn + response.user.avatarUrlNormal);
          res.cookie('headimgurllarge', config.yqtcdn + response.user.avatarUrlNormal);
          res.cookie('headimgurlsmall', config.yqtcdn + response.user.avatarUrlSmall);
          res.cookie('unionid', response.user.uid);
        }

        if(!response.errorcode){
          return next();
        }
      }
      catch (e) {
        console.log('verified token error: ', e);
        return requestOauthUrl(req, res);
      }

      if (response.errorcode) {
        return requestOauthUrl(req, res);
      }
    }) ;
  }

});

app.use(config.appDomain+'/api', apiroutes);

// app.use(config.appDomain+'*',express.static(__dirname + '/../../dist'));

// view engine setup
app.set('views', path.join(__dirname+ '/../../', 'views'));
app.set('view engine', 'ejs');

app.use(config.appDomain+'*',serverRender);


const server = app.listen(config.ports || 3002 , function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
