// This module is used to parse form 
exports.parseForm = function (req,formType,callback) {
	var formidable = require('formidable');
	var data;
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		// Parse Patient Registration Form
		if(formType == 'patient_reg') {
			data =  { mobile:'+61'+fields.mobile,
			 	  Name:fields.fName,
				  Surname:fields.lName, 
				  filepath:files.filetoupload.path,
				  file_ext:'.'+files.filetoupload.name.split('.').pop()
				};
		} // if patient_reg
		// Parse Patient ID Form
		else if (formType == 'patient_id') {
			data = { filepath:files.filetoupload.path,
				 file_ext:'.'+files.filetoupload.name.split('.').pop()
			       };
		}// else if patient_id
		// Parse Receptionist Registration Form
		else if (formType == 'receptionist_reg') {
			data = { mobile:'+61'+fields.mobile};
		}//else if receptionist_reg
		// Parse Verification Form
		else if (formType == 'verification') {
			 data = { filepath:files.filetoupload.path,
                                 file_ext:'.'+files.filetoupload.name.split('.').pop()
                               };
		}// else if verification
		// Parse Doctor Upload
		else if (formType == 'doc_fileupload') {
			var old_path = files.filetoupload.path,
            		    index = old_path.lastIndexOf('/') + 1,
		            file_name = old_path.substr(index),
			    file_ext = '.'+files.filetoupload.name.split('.').pop();
			data = { filepath:files.filetoupload.path,
				 file_name:file_name+file_ext, 
				 mobile: '+61'+fields.mobile
                               };
		}// else if doc_fileupload
		callback(data);
	});// parse form
} // method



