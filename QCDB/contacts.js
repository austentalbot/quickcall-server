var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;

var ContactsSchema = new Schema({ 
    associatedUser:{
      required:true,
      type:String
    },
    name: {
      required: true, 
      type: String,
      unique: true
    },
    phonenumber: {
    	sparse: true,
    	type: String,
    	unique:false
    },
    description:{
      sparse:true,
      type:String,
      unique:false
    }
});

module.exports = mongoose.model('Contacts', UserSchema);
