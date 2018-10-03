// This module is used to display Patient Profile
exports.profile = function(res,mobile) {
	var con = require('./query');
	var sql = "select FilePath,Timestamp from Records where mobile = '"+mobile+"'";
	con.query(sql,function(result) {
		res.render('profile.ejs',{print:result} );
	}); // select
}// method
