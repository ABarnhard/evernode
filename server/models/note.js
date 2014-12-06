/* jshint camelcase:false */

'use strict';

var path    = require('path'),
    AWS     = require('aws-sdk'),
    pg      = require('../lib/postgresql'),
    async   = require('async');

function Note(obj){
}

Note.create = function(obj, cb){
  // console.log(obj);
  // console.log(obj.photos[0].hapi.filename);

  obj.tags = Note.sanitizeTags(obj.tags);

  pg.query('select add_note($1, $2, $3, $4)', [obj.userId, obj.title, obj.body, obj.tags], function(err, results){
    if(err || !(results && results.rows)){return cb(err || 'Note failed to add correctly', null);}
    console.log(results.rows[0].add_note);
    var noteId = results.rows[0].add_note;
    if(!obj.photos){
      console.log('no photos');
      cb(err, noteId);
    }

    if(!Array.isArray(obj.photos)){
      console.log('make photos an array');
      obj.photos = [obj.photos];
    }

    var photos = obj.photos.map(function(obj, i){
      console.log('photoId:', i);
      return {noteId:noteId, photoId:i, stream:obj};
    });

    async.map(photos, uploadPhotoToS3, function(err, photoUrls){
      var urlString = photoUrls.join(',');
      pg.query('SELECT add_photos($1,$2)', [urlString, noteId], function(err, results){
        cb(err, noteId);
      });
    });
  });

};

Note.sanitizeTags = function(s){
  var tags = s.split(',');
  tags.forEach(function(t, i){
    tags[i] = t.trim().toLowerCase();
  });
  return tags.join(',');
};

module.exports = Note;

// HELPER FUNCTIONS //
function uploadPhotoToS3(obj, done){
  var s3     = new AWS.S3(),
      ext    = path.extname(obj.stream.hapi.filename),
      file   = obj.noteId + '_' + obj.photoId + ext,
      url    = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + file,
      params = {Bucket: process.env.AWS_BUCKET, Key: file, Body: obj.stream._data, ACL: 'public-read'};
  s3.putObject(params, function(err){
    console.log('S3 Error:', err);
    done(err, url);
  });
}

