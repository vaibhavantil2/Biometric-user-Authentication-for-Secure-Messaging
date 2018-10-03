// This module is used to verify Mobile number  
exports.smsVerification = function (mobile) {
	var con = require('../database/query');
	var sms = require('./smsModule');
	var randomString = '23wfsdfdw4werfsdf32red'
	var link = 'http:/\/52.64.241.227/sms/?token='+randomString;
	var sql = "INSERT INTO verifyQR (mobile,token) VALUES  ('"+mobile+"', '"+randomString+"')";
		        con.query(sql,function(response) {});
	var message = 'Hi, '+link;
	sms.textMessage(message,mobile);
}// method
