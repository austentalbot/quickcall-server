
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

/**
 * User schema
 */
var UserSchema = new Schema({
  username: { type: String, required: true, unique: true},
  phone: { type: Number, required: true, unique: true}
  // preferences: {}
});

/**
 * User plugin
 */

UserSchema.plugin(userPlugin, {});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.method({

});

/**
 * Statics
 */

UserSchema.static({

});


mongoose.model('User', UserSchema);


exports.login = function(req, res){


};


exports.signup = function(req, res){


};
