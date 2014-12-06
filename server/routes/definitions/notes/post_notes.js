'use strict';

var Joi  = require('joi');
    //Note = require('../../../models/note');

module.exports = {
  description: 'Add a new note',
  tags:['notes'],
  validate: {
    payload: {
      title: Joi.string(),
      body: Joi.string(),
      tags: Joi.string(),
      photos: [Joi.array(), Joi.object(), Joi.any().allow(undefined)],
      output:'stream',
      parse: true
    }
  },
  handler: function(request, reply){
    console.log(request.payload);
    reply().code(418);
  }
};
