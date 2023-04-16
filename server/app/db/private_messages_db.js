// dependencies
import { randomUUID } from 'crypto';
import { PRIVATE_MESSAGES_COLLECTION } from '../db_connection.js';

async function getConversations(userId, request=false, limit=10) {
  let query = {user_id: userId, request: request};
  let results = await PRIVATE_MESSAGES_COLLECTION.find(query).limit(limit).toArray();

  return results;
}

async function createConversation(userId, participants, creationDate) {
  let newConversation = {
    conversation_id: randomUUID(),
    author_id: userId,
    participants: participants,
    creation_date: creationDate
  };
  let result = await PRIVATE_MESSAGES_COLLECTION.insertOne(newConversation);

  return result;
}

async function getMessages(userId, conversationId, limit=20) {
  let query = { conversation_id: conversationId };
  let results = await PRIVATE_MESSAGES_COLLECTION.find(query).limit(limit).toArray();
    
  return results;
}

async function sendMessage(authorId, content, type, replyTo, isRead, conversationId, sentDate) {
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
  let result = await PRIVATE_MESSAGES_COLLECTION.insertOne(newMessage);
  
  return result;
}

async function deleteMessage(authorId, conversationId, messageId) {
  let query = { author_id: authorId, conversation_id: conversationId, message_id: messageId };
  let result = await PRIVATE_MESSAGES_COLLECTION.deleteOne(query);

  return result.deletedCount > 0;
}

export { getConversations, createConversation, getMessages, sendMessage, deleteMessage };