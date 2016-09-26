/*
 import { configureStore } from '../../common/store';
jHbkGcBsAjaYmport { responseToClient } from '../page';
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
const config = require('./config');

 router.get('/home',function(req, res, next){ 
  let token = req.cookies.yqt_token; 
  if(!token) {
    return next(new Error('token needed'));
  }
  let top = 50;
  if(isNaN(top)){
    return next(new Error('invalid top'));
  }
  request({
    url:`${config.yqtapi}/v1/accounts/invitations/rank/${top}`,
    method: 'GET',
    headers: {
      'x-yqt-token':token
    }
  }, function(err, response, body) {
     if(err) return next(err);
     if(response.statusCode !== 200) {
       console.log(response.body);
       return next(new Error(response.body));
     }

     let result = JSON.parse(body).body;
     console.log(`call invitations/rank/:top with:`,result);
     let buildData = {
       result:"success",
       data: {
       }
     };
     let userdata = {
       name: result.userData.nickname,
       ranking: result.userData.rank,
       amounts: result.userData.score || 0,
       avatar: result.userData.avatarUrlSmall,
       avatarNormal: result.userData.avatarUrlNormal
     };

     let ranklist = result.invitationRank.map(value => {
       return {
           nickname: value.nickname,
           recommand: value.score,
           avatar: value.avatarUrlSmall,
           avatarNormal: value.avatarUrlNormal
        }
     });
     buildData.data.userdata = userdata;
     buildData.data.ranklist = ranklist;

     res.send(buildData);
  });
});

router.get('/invite/:uid',function(req,res,next){
  let token = req.cookies.yqt_token;
  if(!token) {
    return next(new Error('token needed'));
  }
    
  let uid = parseInt(token.split("|")[0], 10);
  if(isNaN(uid)) {
    return next(new Error('invalid uid'));
  }

  request({
    url:`${config.yqtapi}/v1/accounts/users/${uid}/invitations`,
    method: 'GET',
    headers: {
      'x-yqt-token':token
    }
  }, function(err, response, body) {
     if(err) return next(err);
     if(response.statusCode !== 200) {
       return next(new Error(response.body));
     }
     let result = JSON.parse(body).body;
     console.log('call game/invitations', result.invitations);
     let data = result.invitations.map( value => {
       return {
          nickname: value.nickname,
          avatar: value.avatarUrlSmall,
          avatarNormal: value.avatarUrlNormal,
          created: value.createAt || Date.now()
       };
     });
     res.send(data);
  });
});

router.put('/mail',function(req,res,next){
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const awardid = req.body.awardid;

  if(!name){
    return next(new Error("请输入正确的姓名"));
  }
  if(!address){
    return next(new Error("请输入正确的邮寄地址"));
  }
  if(!phone){
    return next(new Error("请输入正确的联系电话"));
  }
  if(!awardid || awardid==0){
    return next(new Error("请选择奖品"));
  }
  
  console.log(`******req.cookies.yqt_token: ${req.cookies.yqt_token}`);
  let token = req.cookies.yqt_token;
  if(!token) {
    return next(new Error('token needed'));
  }
  
  let uid = parseInt(token.split("|")[0], 10);
  if(isNaN(uid)) {
    return next(new Error('invalid uid'));
  }

  request({
    url:`${config.yqtapi}/v1/persona/users/${uid}/profile`,
    method: 'PUT',
    headers: {
      'x-yqt-token':token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name:name,address:address, phone:phone, awardid: awardid})
  }, function(err, response, body) {
     if(err) return next(err);
     if(response.statusCode !== 200) {
       return next(new Error(response.body));
     }
     res.end('success');
  });
});


export default router;
