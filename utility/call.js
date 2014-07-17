var plivo = require('plivo');
// fall back to DH's crendential
// this info should be deleted after the authid/token feature is implemented on the client side
var config = require('config').plivo;

exports.callSrcNum = function(req, res) {
    // ask plivo to call the app user
    var params = {
        from: req.body.src,
        to: req.body.src,
        answer_url: "http://quickcall-server.herokuapp.com/xml-response?dst=" + req.body.dst
    };
    // default fallback to DH's API credentials (temporary)
    var credentials = {
        authId: req.body.authId || config.authId,
        authToken: req.body.authToken || config.authToken
    };
    var p = plivo.RestAPI(credentials);
    p.make_call(params, function(status, response) {
        res.send(status, response);
    });
};

exports.callDstNum = function(req, res) {
    // provide an xml instruction which tells plivo what to do after a call gets connected
    // ask plivo to call the person the app user wants to talk to
    var r = new plivo.Response();
    var dialElement = r.addDial();
    dialElement.addNumber(req.body.dst);
    res.send(200, r.toXML());
};

exports.getAccountDetails = function(req, res) {
    // should use req.query, not req.body to parse the query string input from a GET request
    var credentials = {
        authId: req.query.authId || config.authId,
        authToken: req.query.authToken || config.authToken
    };
    var p = plivo.RestAPI(credentials);
    // send an empty obj as it's expected
    p.get_account({}, function(status, response) {
        res.send(status, response);
    });
};


// exports.sendSMS = function(req, res){
//     var params = {};
// };

// exports.receive = function(req, res){
//     var params = {};
// };
