// This module is used to register user via Receptionist
exports.receptionist_reg = function(data,res) {
	var con = require('../database/query');
	var sms = require('../util/smsModule');
	var sql = "select mobile from userDetails where mobile = '"+data.mobile+"'";
	con.query(sql,function(result) {
		if(typeof result[0] != 'undefined') {
			res.render('message.ejs',{message: 'This mobile number is already registered for this service'});
		}// if
		else {
			var sql = "INSERT INTO userDetails (mobile,Verification,RegType) VALUES  ('"+data.mobile+"',1,'RECEPTIONIST')";
			con.query(sql,function(response) {
				res.render('message.ejs',{message: 'Link sent.'});
                                var message = 'Hi, tap to register for secure messaging : http:/\/52.64.241.227/';
                                sms.textMessage(message,data.mobile);
                        }); // insert query
		} // else
	  }); // select query
}// method
