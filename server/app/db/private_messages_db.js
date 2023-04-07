// dependencies
const { MongoClient, ServerApiVersion } = require('mongodb');

// mongodb's stuff
const URI = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority"; // todo : put credentials into env var
const CLIENT = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const DB = CLIENT.db("Hame");




/**
 * Retrieve private conversations from database
 * @param {String} userId 
 * @param {Boolean} request 
 * @param {Int16Array} limit 
 * @returns {Array} private conversations of user
 */
async function getConversations(userId, request=false, limit=10) {
  let collection = await DB.collection("privatemessages");
  let query = {userId: userId, request: request};
  let results = await collection.find(query)
    .limit(limit)
    .toArray();

  return results;
}

async function getMessages(userId, conversationId, limit=20) {
  let collection = await DB.collection("privatemessages");
  let query = {userId: userId, conversationId: conversationId};
  let results = await collection.find(query)
   .limit(limit)
   .toArray();
  
   return results;
}

function sendMessage(userId, conversationId) {

}

function deleteMessage(userId, conversationId, messageId) {
  
}

module.exports = { getConversations, getMessages, sendMessage, deleteMessage };