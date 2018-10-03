// This module is used to register user via sms
exports.sms_reg = function(keyword,number) {
	var con = require('../database/query');
	var sms = require('../util/smsModule');
	var message;
	if( keyword == 'Reg') {
		var sql = "select mobile from userDetails where mobile = '"+number+"'";
		con.query(sql,function(result) {
			if(typeof result[0] != 'undefined') {
				message = 'This mobile number is already registered for this service.';
			} // nested if	
			else {
				var sql = "INSERT INTO userDetails (mobile,Verification,RegType) VALUES  ('"+number+"',1,'SMS')";
				con.query(sql,function(response) {
				}); // insert query
				message = 'Hi, tap to register for secure messaging: http:/\/52.64.241.227/';
       			} // nested else
 			sms.textMessage(message,number);
	 	}); // select query
	}//  if
	else {
                message = 'Sorry, we can\'t quite understand your message.  Please send \'Reg\' to register';
	        sms.textMessage(message,number);
        } // else
} // method

  
