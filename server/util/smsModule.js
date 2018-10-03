// This module is used to send sms using MM API
exports.textMessage = function (message,number) {
const sdk = require('messagemedia-messages-sdk');
const controller = sdk.MessagesController;

// Configuration parameters and credentials
sdk.Configuration.basicAuthUserName = "VuPMWZJUUZpQeCeGaRi9"; // Your API Key
sdk.Configuration.basicAuthPassword = "foTt0BhvGgSnKfLbxLOJoo5DfHjutY"; // Your Secret Key

var body = new sdk.SendMessagesRequest({
   "messages":[
     {
         "content":message,
         "destination_number":number,
      }
   ]
});
controller.createSendMessages(body, function(error, response, context) {
});
}
