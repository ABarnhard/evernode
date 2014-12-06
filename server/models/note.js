'use strict';
/*
var request = require('request'),
    path    = require('path'),
    AWS     = require('aws-sdk'),
    crypto  = require('crypto'),
    pg      = require('../lib/postgresql');
*/

function Note(obj){
}

Note.create = function(obj, cb){
  console.log(obj);
  cb(true, {});
  /*
  randomUrl(obj.avatar, function(file, avatar){
    user.avatar = avatar;
    pg.query('insert into users (username, password, avatar) values ($1, $2, $3) returning id', [user.username, user.password, user.avatar], function(err, results){
      if(err){return cb(true);}
      download(obj.avatar, file, cb);
    });
  });
*/
};

module.exports = Note;

// HELPER FUNCTIONS //
/*
function randomUrl(url, cb){
  var ext  = path.extname(url);

  crypto.randomBytes(48, function(ex, buf){
    var token  = buf.toString('hex'),
        file   = token + '.avatar' + ext,
        avatar = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + file;
    cb(file, avatar);
  });
}

function download(url, file, cb){
  var s3 = new AWS.S3();

  request({url: url, encoding: null}, function(err, response, body){
    var params = {Bucket: process.env.AWS_BUCKET, Key: file, Body: body, ACL: 'public-read'};
    s3.putObject(params, cb);
  });
}
*/
