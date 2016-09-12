/*
 import { configureStore } from '../../common/store';
 import { responseToClient } from '../page';
 import { getUser } from '../controller/user';
 import { getListOfNews } from '../controller/list';
 import { loadNews, getUserInfo } from '../../common/actions/actions';
 import q from 'q';
 import log4js from 'log4js';
 const logger = log4js.getLogger('INDEX-ROUTE');
 */
import request from 'request'
import { Router } from 'express'
import url from 'url';

let router = Router()

router.get('/main',function(req,res,next){
  let uri = 'http://store.dianrong.com/dianrong/api/rest/main_index';
	request.get(uri).pipe(res);
});

router.get('/hot',function(req,res,next){
	// console.log(url.parse(req.url, true).query);
	var page = url.parse(req.url, true).query.page || 1;
  let uri = 'http://store.dianrong.com/dianrong/api/rest/catalog_product_list?size=8&cid=46&page=' + page;
	request.get(uri).pipe(res);
});

router.get('/detail/:pid',function(req,res,next){
  let uri = 'http://store.dianrong.com/dianrong/api/rest/catalog_product_info?pid=' + req.params.pid;
  request(uri, function (error, response, body) {
  	body = body.replace(/(^\s*)|(\s*$)/g, "");
    res.send(JSON.parse(body));
  });
	// request.get(uri).pipe(res);
});
export default router;