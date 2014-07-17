var cors = require('cors');
var bodyParser = require('body-parser');

module.exports = function(app){
  app.use(cors());
  app.use(bodyParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
