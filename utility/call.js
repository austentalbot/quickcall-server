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
        answer_url: "https://quickcall-server.azurewebsites.net/xml-response?dst=" + req.body.dst
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

exports.forwardSMS = function(req, res) {
    //need to pull destination number from database
    console.log('forwarding sms');
    var dst = req.param('ForwardTo') || '';
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

// this function is not yet hooked up, but it is ready to go once the DB and front-end are ready
// we also need to upgrade the account to allow for multiple numbers
exports.createNewUser = function(req, res) {
    var p = plivo.RestAPI({authId: credentials.masterAuthId, authToken: credentials.masterAuthToken});
    // var p = initializePlivo(req);
    // var params = {
    //     name: 'test',
    //     enabled: true
    // };
    var params = {
        name: request.body.id,
        enabled: true
    };
    p.create_subaccount(params, function(status, response) {
        console.log('creating new subuser');

        //save api_id, auth_id, auth_token
        console.log(response);

        //check that message was created and account created without error
        if (response.message==='created') {
            //create object to save params to be sent back to the database and saved
            var saveObj = {
                api_id: response.api_id,
                auth_id: response.auth_id,
                auth_token: response.auth_token
            };

            console.log(response.api_id, response.auth_id, response.auth_token);

            //query available phone numbers
            var acctDetails = {
                country_iso: 'US',
                services: 'voice,sms'
            };

            // to be implemented eventually when we save numbers for non-US countries
            // var numParams = {
            //     country_iso: request.body.country,
            //     services: 'voice,sms'
            // };
            p.get_number_group(numParams, function(stat, resp) {
                //this returns a list of 20 numbers we can use
                console.log('numbers:', resp);

                //we want to rent one of these; we'll just go with the first
                var numId=resp.objects[0].group_id;
                var purchaseParams={
                    group_id: numId,
                    quantity: 1
                };
                p.rent_from_number_group(purchaseParams, function(s, r) {
                    //need to upgrade account to be able to add multiple users

                    //save number to database to be associated with user
                    console.log('response:', r);
                    console.log('signed up for Plivo with account and number');

                    // implement this once we know what the number response looks like
                    // acctDetails.phoneNumber: r.number;

                    res.send(s, acctDetails);
                });
            });
        } else {
            console.log('There was an error saving the account. Plivo response message:', response.message);
            res.send(status, response);
        }
    });
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
            fullResponse.plivoNumber = r.objects[0].number;
            // console.log('full response:', fullResponse);

            res.send(status, fullResponse);
        });
    });

    //set up endpoints for receiving calls and texts
    endpointParams = {
        answer_url: 'https://quickcall-server.azurewebsites.net/incomingCall',
        app_name: 'quickcall',
        message_url: 'https://quickcall-server.azurewebsites.net/incomingSms'
    };
    p.create_application(endpointParams, function(req, res) {
        console.log('set up params', res);
    });

};


// send SMS 
exports.sendSMS = function(req, res){
    var params = {
        src: req.body.plivoNumber,
        dst: req.body.dst,
        text: req.body.text,
        type: 'sms'
    };

    var p = initializePlivo(req);

    p.send_message(params, function (status, response) {
        console.log('Status: ', status);
        console.log('API Response:\n', response);
        res.send(status, response);
    });
};

// exports.receiveSMS = function(req, res){
//     var params = {};
// };
