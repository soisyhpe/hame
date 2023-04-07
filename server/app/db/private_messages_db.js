// dependencies
const { MongoClient, ServerApiVersion } = require('mongodb');
const crypto = require('crypto');
const { time } = require('console');

// mongodb stuff
const URI = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority"; // todo : put credentials into env var
const CLIENT = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const DB = CLIENT.db("Hame");
const COLLECTION_NAME = "privatemessages";

// local stuff
const MESSAGE_TYPE = {
  TEXT_MESSAGE: "Message",
  URL: "URL",
  VOICE: "Voice",
  PICTURE: "Picture",
  VIDEO: "Video"
};




/**
 * Retrieve private conversations from database
 * @param {String} userId 
 * @param {Boolean} request 
 * @param {Int16Array} limit 
 * @returns {Array} private conversations of user
 */
async function getConversations(userId, request=false, limit=10) {
  let collection = await DB.collection(COLLECTION_NAME);
  let query = {user_id: userId, request: request};
  let results = await collection.find(query)
    .limit(limit)
    .toArray();

  return results;
}

async function createConversation(userId, participants, creationDate) {
  let collection = await DB.collection(COLLECTION_NAME);
  let newConversation = {
    conversation_id: crypto.randomUUID(),
    author_id: userId,
    participants: participants,
    creation_date: creationDate
  };
  let result = await collection.insertOne(newConversation);

  return result;
}

/**
 * Retrieve messages from database using conversationId
 * @param {String} userId 
 * @param {String} conversationId 
 * @param {Int16Array} limit 
 * @returns {Array} messages related to a conversation
 */
async function getMessages(userId, conversationId, limit=20) {
  let collection = await DB.collection(COLLECTION_NAME);
  let query = {conversation_id: conversationId};
  let results = await collection.find(query)
    .limit(limit)
    .toArray();
    
  return results;
}

/**
 * Send a message into a conversation using conversationId
 * @param {Number} userId 
 * @param {Number} conversationId 
 * @param {String} content 
 * @param {Enumerator} type 
 * @param {Number} replyTo 
 * @param {Boolean} isRead 
 * @param {Date} sentDate 
 * @returns 
 */
async function sendMessage(authorId, content, type, replyTo, isRead, conversationId, sentDate) {
  let collection = await DB.collection(COLLECTION_NAME);
  let newMessage = {
    message_id: crypto.randomUUID(),
    author_id: authorId,
    content: content,
    type: type,
    reply_to: replyTo,
    is_read: isRead,
    conversation_id: conversationId,
    sent_date: sentDate
  };
  let result = await collection.insertOne(newMessage);
  
  return result;
}

async function deleteMessage(authorId, conversationId, messageId) {
  let collection = await DB.collection(COLLECTION_NAME);
  let query = {author_id: authorId, conversation_id: conversationId, message_id: messageId};
  let result = await collection.deleteOne(query);

  return result.deletedCount === 1;
}

module.exports = { getConversations, createConversation, getMessages, sendMessage, deleteMessage };