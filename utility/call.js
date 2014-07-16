var plivo = require('plivo');
var config = require('config');

exports.callSrcNum = function(req, res){
	// ask plivo to call the app user
	var srcNum = req.body.src;
	var dstNum = req.body.dst;
	var base_answerUrl = "http://quickcall-server.herokuapp.com/xml-response";
	var p = plivo.RestAPI(config.plivo);
	var params = {};
    // to display the app user's number as a caller ID
    params.from = srcNum;
    params.to = srcNum;
    params.answer_url = base_answerUrl + "?dst=" + dstNum;
    p.make_call(params, function(status, response) {
    	res.send(status, response);
    });
};

exports.callDstNum = function(req, res){
	// provide xml instruction to plivo
	// ask plivo to call the person the app user wants to talk to
    var dstNum = req.body.dst;
    var r = new plivo.Response();
    var dialElement = r.addDial();
    dialElement.addNumber(dstNum);
    var xmlRes = r.toXML();
    res.send(200, xmlRes);	
};

exports.getAccountDetails = function(req, res){
    var p = plivo.RestAPI(config.plivo);
    p.get_account(params, function(status, response){
      res.send(status, response);
    });
};
