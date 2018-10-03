// This module is used to move Data to S3 Bucket  
exports.movetos3 = function (filename,path,callback) {
	var AWS = require('aws-sdk');
	var fs = require('fs');
	var bucket = 'mm-bioauth-aws-rekognition';
	fs.readFile(path, function (err, data) {
  		if (err) { throw err; }
		var base64data = new Buffer(data, 'binary');
		var s3 = new AWS.S3();

  		s3.putObject({Bucket: bucket,Key: filename,Body: base64data,ACL: 'public-read'},function (resp) {
			fs.unlink(path,function(err){
       				 if(err) return console.log(err);
   			});  // delete file
	  		callback();
		});// s3
	}); // readfile
}
