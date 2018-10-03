// This module is used to analyse and detect valid face
exports.detectFace = function (bucket,key,callback) {
	var AWS = require('aws-sdk')
	AWS.config.update({region: "ap-southeast-2"});
	var rekognition = new AWS.Rekognition();
	var conLevel = 0; 
	var params = {Image: {S3Object: {Bucket: bucket, Name: key}}};
	// This method is used to call rekognition API to detect face
 	rekognition.detectFaces(params, function(err, data) {
   		if (err) {
		}
   		else {     
			var multipleface = data.FaceDetails.length;
			if(multipleface == 1) {
				conLevel = data.FaceDetails[0].Confidence;
			}
			var result = { multipleFace: multipleface,confidence: conLevel };
			callback(result);		
   		}
 	}); // rekognition
}// method
