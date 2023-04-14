// dependencies
const { randomUUID } = require('crypto');
const { time } = require('console');
const { DATABASE } = require('../db_connection');

// local stuff
const COLLECTION_NAME = "private-messages";

async function getConversations(userId, request=false, limit=10) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId, request: request};
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function createConversation(userId, participants, creationDate) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let newConversation = {
    conversation_id: randomUUID(),
    author_id: userId,
    participants: participants,
    creation_date: creationDate
  };
  let result = await collection.insertOne(newConversation);

  return result;
}

async function getMessages(userId, conversationId, limit=20) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = { conversation_id: conversationId };
  let results = await collection.find(query).limit(limit).toArray();
    
  return results;
}

async function sendMessage(authorId, content, type, replyTo, isRead, conversationId, sentDate) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
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
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = { author_id: authorId, conversation_id: conversationId, message_id: messageId };
  let result = await collection.deleteOne(query);

  return result.deletedCount === 1;
}

module.exports = { getConversations, createConversation, getMessages, sendMessage, deleteMessage };