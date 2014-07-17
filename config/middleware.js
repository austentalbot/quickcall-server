var cors = require('cors');

module.exports = function(app){
  app.use(cors());
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
};
