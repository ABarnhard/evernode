'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Delete Note',
  tags:['notes'],
  validate: {
    params: {
      noteId: Joi.number().required()
    }
  },
  handler: function(request, reply){
    request.params.userId = request.auth.credentials.id;
    Note.nuke(request.params, function(err, noteId){
      reply({noteId:noteId}).code(err ? 400 : 200);
    });
  }
};
