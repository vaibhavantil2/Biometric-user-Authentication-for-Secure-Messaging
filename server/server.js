var express = require('express');
var app = express();
var formidable = require('formidable');
var fs = require('fs');
var bodyParser = require('body-parser');
var s3 = require('./aws/movetos3');
var parse = require('./util/parseForm');
var con = require('./database/query');
// To server static content
app.use(express.static(__dirname + '/public',{extensions: ['html']})); //Serves resources from public folder
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // supp
var mobile;
var tagId=0;

//------------------------------------------------------------
app.post('/patient_reg',function (req, res) {
	parse.parseForm(req,'patient_reg',function(data) {
		mobile = data.mobile; // Assign mobile value to use it for id
		var reg = require('./registration/user_reg');
		reg.user_reg(data,res,function(move) {
			if(move == 1) {
				var fileName = 'source/'+data.mobile+data.file_ext;
				s3.movetos3(fileName,data.filepath,function(callback) {
					var sql ="UPDATE userDetails SET cred = '"+fileName+"' WHERE mobile = '"+mobile+"'";
                        		con.query(sql,function(response) {});
				}); // s3move
			}// if
		}); // user_reg 
	}); // parse
}); // /process_post

//---------------------------------------------------------------
app.post('/patient_id', function (req, res) {
	parse.parseForm(req,'patient_id',function(data) {
		var fileName = 'id/'+mobile+'_id'+data.file_ext;
		s3.movetos3(fileName,data.filepath,function(callback) {
			var sql ="UPDATE userDetails SET pid = '"+fileName+"' WHERE mobile = '"+mobile+"'";
                	con.query(sql,function(response) {
				var check = require('./aws/checks');
		                check.checks(mobile,res,function(result) {
			//		console.log(result);
				}); // aws checks
			});// update query
		}); // s3move
	}); // parse
}); // /processID

//-----------------------------------------------------------------
app.post('/receptionist_reg', function (req, res) {
	parse.parseForm(req,'receptionist_reg',function(data) {
	var reg = require('./registration/receptionist_reg.js');
	reg.receptionist_reg(data,res);
	});// parse
}); // /docfileupload

//----------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/', function (req, res) {
	var reg = require('./registration/sms_reg.js');
	reg.sms_reg(req.body.content,req.body.source_number);
	res.end();
}); // Webhook for inbound number

//----------------------------------------------------------------------------------
app.post('/doc_fileupload', function (req, res) {
	parse.parseForm(req,'doc_fileupload',function(data) {
        	var doc = require('./doctor.js');
	        doc.docfileupload(data,res);
	});// parse
}); // /docfileupload
//--------------------------------------------------------------------------------------
app.get('/access/', function(req, res) {
	tagId = req.query.tagId;
//	console.log('get:'+tagId);
	res.redirect("http:/\/52.64.241.227/verification");
});
//---------------------------------------------------------------------------------------
app.post('/verification',function(req, res) {
//	console.log('post:'+tagId);
	if (tagId == 0) {
		res.render('message.ejs',{message: 'Invalid Link'});
	}// if
	else {
		parse.parseForm(req,'verification',function(data) {
			var fileName = 'target/+'+tagId+data.file_ext;
			var mobile = '+'+tagId;
                	s3.movetos3(fileName,data.filepath,function(callback) {
				var verify = require('./aws/verification');
				verify.verification(mobile,fileName,function(result) {
//					console.log(result); // if condition required
					if( result.multipleMatch == 1 && result.similarity >=90) {
						var  display = require('./database/profile');
						display.profile(res,mobile);
					}
					else  { 
						res.render('message.ejs',{message: 'Try again, match failed'}); 
					}
				}); //verify
			});// s3 move
		});//parse
	}// else
}); 
//---------------------------------------------------------------------------------------------------
app.get('/', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	var myReadStream = fs.createReadStream(__dirname + '/public/patient_registration.html', 'utf8');
	myReadStream.pipe(res);
});
//--------------------------------------------------------------------------------------------
app.get('*', function(req, res) {
	res.render('message.ejs',{message: 'Page not found.'});
});
//--------------------------------------------------------------------
// Server on Port 3000
var server = app.listen(3000);
