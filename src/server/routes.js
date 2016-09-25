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

router.get('/home',function(req,res,next){
  let data = {
    result:'success',
    data:{
      userdata:{
        name:'jason',
        ranking:3,
        amounts:90,
        avatar:'http://musicdata.baidu.com/data2/pic/ead4ec51613bda05c58dd25348a13528/117472743/117472743.jpg'
      },
      ranklist:[
         {
           nickname:'qimenxiaozi',
           recommand: 23,
           avatar: 'http://dev.yqtcdn.net/avatar/000/000/777/1473669533632_256x256.jpg'
         },
         {
           nickname:'hualu',
           recommand: 20,
           avatar: 'http://dev.yqtcdn.net/avatar/000/000/777/1473669533632_256x256.jpg'
         },
         {
           nickname:'fiowind',
           recommand: 14,
           avatar: 'http://dev.yqtcdn.net/avatar/000/000/777/1473669533632_256x256.jpg'
         },
         {
           nickname:'hualu',
           recommand: 10,
           avatar: 'http://dev.yqtcdn.net/avatar/000/000/777/1473669533632_256x256.jpg'
         },
         {
           nickname:'hualu',
           recommand: 4,
           avatar: 'http://dev.yqtcdn.net/avatar/000/000/777/1473669533632_256x256.jpg'
         },
         {
           nickname:'qimenxiaozi',
           recommand: 23,
           avatar: 'http://dev.yqtcdn.net/avatar/000/000/777/1473669533632_256x256.jpg'
         },
         {
           nickname:'hualu',
           recommand: 20,
           avatar: 'http://dev.yqtcdn.net/avatar/000/000/777/1473669533632_256x256.jpg'
         },
         {
           nickname:'fiowind',
           recommand: 14,
           avatar: 'http://dev.yqtcdn.net/avatar/000/000/777/1473669533632_256x256.jpg'
         },
         {
           nickname:'hualu',
           recommand: 10,
           avatar: 'http://dev.yqtcdn.net/avatar/000/000/777/1473669533632_256x256.jpg'
         },
         {
           nickname:'hualu',
           recommand: 4,
           avatar: 'http://dev.yqtcdn.net/avatar/000/000/777/1473669533632_256x256.jpg'
         }
      ]
    }
  }
  res.send(data);
});

router.get('/invite/:uid',function(req,res,next){
  let uid = req.params.uid;
  let data = [
   {
     nickname:'qimenxiaozi',
     avatar: 'http://dev.yqtcdn.net/avatar/000/000/777/1473669533632_256x256.jpg',
     created: 1474443017
   },
   {
     nickname:'hualu',
     avatar: 'http://dev.yqtcdn.net/avatar/000/000/777/1473669533632_256x256.jpg',
     created: 1474443017
   } 
  ];
  res.send(data);
});

router.post('/mail',function(req,res,next){
  const uid = req.cookies.unionid||2;
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const awardid = req.body.phone;
  if(uid==undefined){
    res.send("无登录状态");
  }
  else if(name==undefined){
    res.send("请输入正确的姓名");
  }
  else if(address==undefined){
    res.send("请输入正确的邮寄地址");
  }
  else if(phone==undefined){
    res.send("请输入正确的联系电话");
  }
  else if(awardid==undefined||awardid==0){
    res.send("请选择奖品");
  }
  else{
    //aaaa
    res.send("success");
  }
});


export default router;