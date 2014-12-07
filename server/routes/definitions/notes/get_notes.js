'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
  description: 'Return requested notes for user',
  tags:['notes'],
  validate: {
    params: {
      limit: Joi.number(),
      offset: Joi.number(),
      filter: Joi.string()
    }
  },
  handler: function(request, reply){
    request.params.userId = request.auth.credentials.id;
    Note.query(request.params, function(err, notes){
      reply(notes).code(err ? 400 : 200);
    });
  }
};
