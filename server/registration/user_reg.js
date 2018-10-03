// This module is used to register user
exports.user_reg = function (data,res,callback) {
	var con = require('../database/query');
	var sql = "select * from userDetails where mobile = '"+data.mobile+"'";
	var move;
	con.query(sql,function(result) {
		if(typeof result[0] == 'undefined') {
			var sql ="INSERT INTO userDetails (fName,lname,RegType,mobile) VALUES  ('"+data.Name+"', '"+data.Surname+"', 'QR','"+data.mobile+"')";
			con.query(sql,function(response) {
				res.redirect("uploadID");
			});
			move = 1;
		}
		else if((result[0].status == 0) && typeof result[0] != 'undefined') {
			var sql ="UPDATE userDetails SET fname = '"+data.Name+"', lName = '"+data.Surname+"' WHERE mobile = '"+data.mobile+"'";
			con.query(sql,function(response) {
                                res.redirect("uploadID");
                        });
			move = 1;
		}
		else {
			res.render('message.ejs',{message: 'This mobile number is already registered for this service'});
			move = 0;
		};
		callback(move); 
	});// query
}
