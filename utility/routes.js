var phone = require('./call');


module.exports = function(app) {
  app.get('/', function(req, res) {
  	res.send(200, 'hello world');
  });  

  app.post('/call', function(req, res) {
   phone.callSrcNum(req, res);
  });

  app.post('/xml-response', function(req, res) {

    phone.callDstNum(req, res);
  });

  app.get('/account', function(req,res){
  	phone.getAccountDetails(req, res);
  });
};
