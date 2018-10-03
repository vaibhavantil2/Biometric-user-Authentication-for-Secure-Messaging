// This module is used to Execute Query for the DataBase
// @parameter Query
exports.query = function (sql,callback) {
	var mysql = require('mysql');
	var con = mysql.createConnection({
	    host: "localhost",
	    user: "root",
	    password: "root",
	    database: "mmDevDatabase"
	});
	con.connect(function(err) {
		if (err) throw err;
  	  	con.query(sql, function (err, result) {
    			if (err) throw err;
				callback(result);
  	}); //query
	con.end(); // end connection
	});// connect
}
