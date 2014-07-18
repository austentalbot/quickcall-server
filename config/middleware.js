// you know what's happening here.
// cors middleware is needed to enable the cross-origin requests
var cors = require('cors');
var bodyParser = require('body-parser');

module.exports = function(app){
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cors());
};
