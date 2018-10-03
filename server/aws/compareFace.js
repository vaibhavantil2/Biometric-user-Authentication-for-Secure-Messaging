// This module is used to compare given Biometric data with existing one
exports.compareFace = function (bucket,key,id,callback) {
	var AWS = require('aws-sdk')
	AWS.config.update({region: "ap-southeast-2"});
	var rekognition = new AWS.Rekognition();
	var similarity = 0; 
	var params = {	SimilarityThreshold: 0,   
			SourceImage: { S3Object: { Bucket: bucket, Name: key }}, 
			TargetImage: { S3Object: { Bucket: bucket, Name: id }}
 	};
	// This method is used to call AWS Rekognition API to compare two faces
	 rekognition.compareFaces(params, function(err, data) {
   		if (err) {
			var result = {multipleMatch: 0, similarity:0};
                        callback(result);
		}
		else {
			var multipleMatch = data.FaceMatches.length;
			if( multipleMatch == 1) {
				similarity = data.FaceMatches[0].Similarity;
			}
			var result = {multipleMatch: multipleMatch, similarity:similarity};
			callback(result);
		}
 }); // compare face
}// method
