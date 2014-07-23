var phone = require('./call');

module.exports = function(app) {
  // technically we don't need / route
  // just have it for a quick check if the server is running okay
  app.get('/', function(req, res) {
    res.send(200, 'hello world');
  });

  app.post('/call', function(req, res) {
    console.log(req.body, 'call');
    phone.callSrcNum(req, res);
  });

  app.post('/sms', function(req, res) {
    console.log(req.body, 'sms');
    phone.sendSMS(req, res);
  });

  app.post('/xml-response', function(req, res) {
    phone.callDstNum(req, res);
  });

  app.get('/account', function(req, res) {
    phone.getAccountDetails(req, res);
  });
};
