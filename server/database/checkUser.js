// This module is used to check record of user in the Database
exports.checkUser = function (mobile,callback) {
	var query = require('./query');
	var sql = "select * from userDetails where mobile = '"+mobile+"'";
	var user;
	query.query(sql,function(result) {
		if(typeof result[0] == 'undefined') {
			user = {exist:false};
		}
		else {
			user = {exist:true};
		}
		callback(user);
	}); //query
}// method
