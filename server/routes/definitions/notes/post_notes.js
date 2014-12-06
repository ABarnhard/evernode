'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Add a new note',
  tags:['notes'],
  payload: {
    maxBytes: 300000000,
    output:'stream',
    parse: true
  },
  validate: {
    payload: {
      title: Joi.string(),
      body: Joi.string(),
      tags: Joi.string(),
      photos: [Joi.array(), Joi.object(), Joi.any().allow(undefined)]
    }
  },
  handler: function(request, reply){
    request.payload.userId = request.auth.credentials.id;
    Note.create(request.payload, function(err, noteId){
      reply({noteId:noteId}).code(err ? 418 : 200);
    });
  }
};

/*
{ title: 'Test 1 Title',
  body: 'Test 1 Body',
  tags: 'test1',
  photos: <Buffer ff d8 ff db 00 43 00 0a 07 07 08 07 06 0a 08 08 08 0b 0a 0a 0b 0e 18 10 0e 0d 0d 0e 1d 15 16 11 18 23 1f 25 24 22 1f 22 21 26 2b 37 2f 26 29 34 29 21 22 ...> }
  */
