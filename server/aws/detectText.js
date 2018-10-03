// This module is used to detect text using AWS Rekognition API
exports.detectText = function (bucket,id,name,callback) {
	var AWS = require('aws-sdk')
	AWS.config.update({region: "ap-southeast-2"});
	var rekognition = new AWS.Rekognition();
	var params = {Image: { S3Object: {Bucket: bucket,Name: id } } };
	var result = {match:'false'};
	rekognition.detectText(params, function(err, data) {
  		if (err) {
			console.log(err, err.stack); // an error occurred
		}
		else {
			count = data.TextDetections.length;
			for (var i = 0; i < count; i++) { 
				if (data.TextDetections[i].DetectedText == name) {
					result = {match: 'true'};
					break;
				}// if
			}// for
		}// else
		callback(result);
		}); // detect text
}// method
