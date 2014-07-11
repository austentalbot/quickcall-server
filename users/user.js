var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;


UserSchema.method({
  google: {
    username: {
      required: true,
      type: String
    },
    token: String
  },
  phoneNumber: String
});

UserSchema.statics.findUserByPhoneNumber = function (number) {
  var User = mongoose.model('User');
  User.findOne({phoneNumber: number}, function (err, user) {
  });
};

module.exports = mongoose.model('User', UserSchema);
