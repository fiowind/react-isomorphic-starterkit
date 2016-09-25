'use strict'
const request = require('request');

exports.getFullUrl = function(req){
  return req.protocol + '://' + req.get('host') + req.originalUrl;
}


exports.DBQuery = function(dbQuery){
  return new Promise(function(resolve, reject){
      dbQuery.asCallback((err, items) => {
          if(err) return reject(err);
          return resolve(items);
      });
  });
}

exports.Request = function(options){
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if(err) return reject(err);
      try {
        return resolve(body);
      }
      catch(e){
        return reject(e);
      }
    })
  })
}