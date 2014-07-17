var phone = require('./call');


module.exports = function(app) {
  var cors = require('cors');
  var bodyParser = require('body-parser');

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get('/', function(req, res) {
  	res.send(200, 'hello world');
  });  

  app.post('/call', function(req, res) {
   console.log(req.body, 'call');
   phone.callSrcNum(req, res);
  });

  app.post('/xml-response', function(req, res) {
    phone.callDstNum(req, res);
  });

  app.get('/account', function(req,res){
  	phone.getAccountDetails(req, res);
  });
};
