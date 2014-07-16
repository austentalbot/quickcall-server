var mongoose = require('mongoose');
var contact = require('./contacts.js');
var Schema = mongoose.Schema;

var UserSchema = new Schema({ 
  username: {
    required: true, 
    type: String,
    unique: true
  },
  phonenumber: {
    sparse: true,
    type: String
  },
  fullName: {
    sparse: true,
    type: String
  },
  picture: {
    sparse: true,
    type: String
  },
  contacts:[contact]
});
module.exports = mongoose.model('User', UserSchema);
