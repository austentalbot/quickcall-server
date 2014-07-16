module.exports = function(app){
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
};
