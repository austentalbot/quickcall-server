var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
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
    }
    // preferences: {}
});

module.exports = mongoose.model('User', UserSchema);
