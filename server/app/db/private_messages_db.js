// dependencies
const { MongoClient, ServerApiVersion } = require('mongodb');

// mongodb's stuff
const URI = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority"; // todo : put credentials into env var
const CLIENT = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const PRIVATE_MESSAGES = CLIENT.db("Hame").collection("privatemessages")




function getConversations(userId, requests=false, limit=10) {

}

function getConversation(userId, conversationId) {

}

function getMessages(userId, conversationId, limit=20) {

}

function sendMessage(userId, conversationId) {

}

function deleteMessage(userId, conversationId, messageId) {
  
}