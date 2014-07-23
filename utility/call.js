// to connect voice calls, we are relying on the Plivo API and its Nodejs library
// for more details: https://github.com/plivo/plivo-examples-node

var plivo = require('plivo');

// this is required to make requests to plivo
// the auth pair is tied to the user's account and remaining $ credit
// so plivo will handle the payment instead of us
var initializePlivo = function(req) {
    var credentials = {
        authId: req.body.authId || req.query.authId,
        authToken: req.body.authToken || req.query.authToken
    };
    return plivo.RestAPI(credentials);
};

// calling the app user's number (src)
// when a call is connected, plivo will make a GET request to answer_url (callback)
// expecting an xml instruction to call the app user's friend (dst)
// the from property in params obj is where you set the callerID
// check https://www.plivo.com/docs/api/call/
exports.callSrcNum = function(req, res) {
    var params = {
        from: req.body.src,
        to: req.body.src,
        answer_url: "http://quickcall-server.herokuapp.com/xml-response?dst=" + req.body.dst
    };
    var p = initializePlivo(req);
    p.make_call(params, function(status, response) {
        res.send(status, response);
    });
};

// this will generate an xml doc which tells plivo to call the app user's friend (dst)
// check https://www.plivo.com/docs/xml/
exports.callDstNum = function(req, res) {
    var r = new plivo.Response();
    var dialElement = r.addDial();
    dialElement.addNumber(req.body.dst);
    res.send(200, r.toXML());
};

// this is needed to fetch our user account details from Plivo
// check https://www.plivo.com/docs/api/account/
// this now also pulls the account's phone number for sending texts
exports.getAccountDetails = function(req, res) {
    var p = initializePlivo(req);
    p.get_account({}, function(status, response) {
        p.get_numbers({}, function(s, r) {
            console.log('get numbers response:\n', r);
            
            var fullResponse = response;
            fullResponse.number = r.objects[0].number;
            // console.log('full response:', fullResponse);

            res.send(status, fullResponse);
        });
    });
};


// send SMS 
// exports.sendSMS = function(){
exports.sendSMS = function(req, res){
    // var params = {
    //     src: '14158704946',
    //     dst: '14154941380',
    //     text: 'hello from Plivo! this is austen. let me know if this works.',
    //     type: 'sms'
    // };
    
    var params = {
        // src: req.body.src,
        src: '14158704946',
        dst: req.body.dst,
        // text: req.body.text,
        text: 'hello from Plivo! this is austen. let me know if this works.',
        type: 'sms'
    };

    var p = initializePlivo(req);

    p.send_message(params, function (status, response) {
        console.log('Status: ', status);
        console.log('API Response:\n', response);
        res.send(status, response);
    });
};

// exports.receive = function(req, res){
//     var params = {};
// };
