var phone = require('./call');


module.exports = function(app) {
  app.get('/', function(req,res){
    res.send('Home');
  });
  app.post('/call', function(req, res) {
   phone.callSrcNum(req, res);
  });
  app.post('/xml-response', function(req, res) {

    phone.callDstNum(req, res);
  });
};
