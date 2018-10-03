// This module is used to perform various checks on biometric data like valid face and multiple face
exports.checks = function(mobile,res,callback) {
	var con = require('../database/query');
	var bucket = 'mm-bioauth-aws-rekognition';
	var sms = require('../util/smsModule');
	var sql ="select cred,pid,fName,Verification from userDetails  WHERE mobile = '"+mobile+"'";
        con.query(sql,function(response) {
		var key = response[0].cred;
		var id = response[0].pid;
		var name = response[0].fName;
		var sms_veri = response[0].Verification;
		var validFace = require('./detectFace');
		// This method is used to detect a valid face
		// @parameter bucketname and objectname
		validFace.detectFace(bucket,key,function(result) {
			if(result.multipleFace != 1 || result.confidence <= 75) {
				res.render('message.ejs',{message: 'Your photo does not meet the minimum requirements.  Please try again'});
			} // if
			else {
				var compare = require('./compareFace');
				// This method is used to verify PhotoID of the user with his existing biometric data
				// @parameter bucketname, biometricobject and Idobject
				compare.compareFace(bucket,key,id,function(resu) {
					if(resu.multipleMatch !=1 || res.similarity < 75) {
						res.render('message.ejs',{message: 'Your photo does not meet the minimum requirements.  Please try again'});	
					} //if
					else {
								res.render('message.ejs',{message: 'Thanks, your registration is complete. '});
								var sql ="UPDATE userDetails SET status = '1' WHERE mobile = '"+mobile+"'";
							 	con.query(sql,function(response) {});
					}// else
				});//compare face
			} // else
		}); // valid face
	}); // select query
}// method
