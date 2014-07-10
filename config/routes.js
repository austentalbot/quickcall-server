/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var home = require('home');
var plivo = require('plivo');
var config = require('./config');

/**
 * Expose
 */

module.exports = function(app, passport) {

  // app.get('/', home.index);

  app.post('/call', function(req, res) {
    var srcNum = req.body.src;
    var dstNum = req.body.dst;
    var base_answerUrl = "http://simple-dialer.herokuapp.com/xml-response";

    var p = plivo.RestAPI(config.plivo);
    var params = {};
    // app's plivo number
    params.from = "14158703373";
    // phone number of the app user
    params.to = srcNum;
    // dst phone number of the target person
    // should pass this so that get handler can receive
    params.answer_url = base_answerUrl + "?dst=" + dstNum;
    p.make_call(params, function(status, response) {
      res.send(status, response);
    });
  });

  app.post('/xml-response', function(req, res) {
    var dstNum = req.body.dst;
    // should get the number to call
    var r = new plivo.Response();
    var dialElement = r.addDial();
    // get the target number
    dialElement.addNumber(dstNum);
    r.addSpeak('Awesome', {
      loop: 2
    });
    var xmlRes = r.toXML();
    res.send(200, xmlRes);
  });

  
};