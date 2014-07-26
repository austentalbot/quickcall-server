var Firebase = require('firebase');
var plivo = require('plivo');

var rootRef =  new Firebase('https://quickcallhr.firebaseio.com');
var user = {};

user.forwardSMS = function(req, res, forwardNumber) {
    //need to pull destination number from database

    console.log('forward number:', forwardNumber);

    console.log('forwarding sms');
    var dst = forwardNumber;
    var from = req.param('From') ||  '';

    // Custom CLID is not allowed, so use Plivo DID instead.
    var src = req.param('To') || '';
    var txt = req.param('Text') || '';
    var r = plivo.Response();

    // Generate an XML response with <Message> tag, only if,
    // all the mandatory attributes are available.
    if (dst && src && txt) {
        console.log('generating response');
        var params = {'src':src,'dst':dst};
        r.addMessage('Message from ' + from + ': ' + txt, params);
        console.log('r', r);
    } else {
        console.log('not generating response');
        console.log('dst:', dst);
        console.log('src:', src);
        console.log('txt:', txt);
        console.log('request body:', req.body);
    }

    res.set({
        'Content-Type': 'text/xml'
    });
    // res.end(r.toXML());
    res.send(200, r.toXML());
};

user.getUserData = function(req, res, callback) {

  var plivo_phone = req.body.To;

  // <<- query database for userId
  //     this requires a nested for in loop 
  rootRef.on('value', function(rootSnapshot) {

    console.log('snapshot of db');
    console.log(rootSnapshot);

    var rootPayload = rootSnapshot.val();
    for (var data in rootPayload) {
      if (rootPayload.hasOwnProperty(data)) {
        var user = rootPayload[data];
        for (var key in user) {
          var userData = user[key]; 
          if (userData.plivo_phone === plivo_phone) {
            console.log('user data');
            console.log(userData);

            callback(req, res, userData.phoneNumber);
          } 
        }
      } else {
        console.log('plivo_phone not found');
      }
    }
  });
}; 




module.exports = user; 