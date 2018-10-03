// This module is used to perform verification of existing Biometric data with given one
exports.verification = function(mobile,fileName,callback) {
	var con = require('../database/query');
	var sql ="select cred from userDetails  WHERE mobile = '"+mobile+"'";
	con.query(sql,function(response) {
		var bucket = 'mm-bioauth-aws-rekognition';
		var key = response[0].cred;
		var compare = require('./compareFace');
                compare.compareFace(bucket,key,fileName,function(result) {
			callback(result);
		}); // compare
	}); // select query


}// method
