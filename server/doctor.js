// This module is used to send secure message to patient 
exports.docfileupload = function(data,res) {
	var fs = require('fs');
	var con = require('./database/query');
	var sms = require('./util/smsModule');
	var  new_path = '/home/ubuntu/server/public/records/'+data.file_name;
	var  filepath =  '/records/'+data.file_name;
	var tagId = data.mobile.substring(1);
	var link = 'http:/\/52.64.241.227/access/?tagId='+tagId;
	var message = 'Hi, '+'access your secure message via. '+link;
  	fs.readFile(data.filepath, function(err, stream) {
            fs.writeFile(new_path, stream, function(err) {
                fs.unlink(data.filepath, function(err) {
                    if (err) {
                        res.status(500);
                        res.json({'success': false});
                    }// if 
		    else {
			var sql = "INSERT INTO Records (mobile,FilePath,Timestamp) VALUES  ('"+data.mobile+"', '"+filepath+"',CURRENT_TIME())";
		        con.query(sql,function(response) {});
                        res.status(200);
			res.render('message.ejs',{message: 'File has been successfully uploaded'});
			sms.textMessage(message,data.mobile);
                    } // else
                });// delete file
            });// write file
        }); // read file
}// method
