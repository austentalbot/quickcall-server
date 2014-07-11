
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
  email: { type: String, required: true, unique: true},
  phone: { type: Number, required: true, unique: true},
  hashed_password: { type: String, default: '' }
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

/**
 * Register
 */

mongoose.model('User', UserSchema);
