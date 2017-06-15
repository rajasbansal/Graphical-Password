/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,

  attributes: {
  	name: {
  		type: 'string',
  		required: true
  	},
  	encryptedPassword: {
  		type: 'string'
      //required: true Later
  	},
    colour: {
      type: 'string', //has to be from one of the options. Will add,
      required: true
    },
    email: {
      type: 'string',
      required: true,
      email: true,
      unique: true
    },
    username: {
      type: 'string',
      required: true,
      unique: true
    }
  }

};

