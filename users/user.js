var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;

var UserSchema = new Schema({ 
    username: {
      required: true, 
      type: String,
      unique: true
    },
    phonenumber: String
   // ,preferences: {}
});
module.exports = mongoose.model('User', UserSchema);
