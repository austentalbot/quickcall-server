var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;
var contacts = new Schema({ 
  name:{
    sparse: true,
    type: String
  },
  phonenumber:{
    sparse: true,
    type: String
  },
  image:{
    sparse: true,
    type: String
  }
});

module.exports = mongoose.model('Contacts', contacts);
