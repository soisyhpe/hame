// dependencies
const express = require('express');
const pm = require('../db/private_messages_db');

// express' stuff
const PRIVATE_MESSAGES_API = express.Router();




/**
 * conversation schema :
 * {
 *   _id: ...,
 *   conversation_id: ...,
 *   author_id: user_id2,
 *   participants: [
 *     user_id1, user_id2
 *   ],
 *   creation_date: ...
 * }
 * 
 * message schema:
 * {
 *   _id: ...,
 *   message_id: ...,
 *   author_id: user_id1,
 *   content: "voilà un message",
 *   type: ...,
 *   reply_to: message_id,
 *   is_read: boolean,
 *   conversation_id: ...,
 *   sent_date: ...
 * }
 */

PRIVATE_MESSAGES_API
  .use(express.json())

  // get all private conversations
  .get('/:userId', async (req, res) => {
    let result = pm.getConversations(req.params.userId);

    if (!result) res.status(400).json({message: "No private conversations was found"});
    else res.status(200).json(result);
  })
  
  // get all requests for private conversations
  .get('/:userId/requests', async (req, res) => {
    let result = await pm.getConversations(req.params.userId, true);

    if (!result) res.status(400).json({message: "No requests for private conversations was found"});
    else res.status(200).json(result);
  })

  // post a new conversation
  .post('/:userId/conversations/', async (req, res) => {
    let { participants, creation_date } = req.body;
    let result = await pm.createConversation(req.params.userId, participants, creation_date);

    if (!result) res.status(400).json({message: "Unable tso create a new conversation"});
    else res.status(200).json({message: "New conversation was created successfully"});
  })
 
  // get all messages from a conversation
  .get('/:userId/conversations/:conversationId/messages', async (req, res) => {
    let result = await pm.getMessages(req.params.userId, req.params.conversationId);

    if (!result) res.status(400).json({message: "No messages was found"});
    else res.status(200).json(result);
  })

  // post a new message
  .post('/:userId/conversations/:conversationId/messages/', async (req, res) => {
    let { content, type, reply_to, is_read, sent_date } = req.body; 
    let result = await pm.sendMessage(req.params.userId, content, type, reply_to, is_read, req.params.conversationId, sent_date);

    if (!result) res.status(400).json({message: "Unable to post a new message"});
    else res.status(200).json({message: "Message was posted successfully"});
  })

  // delete a message
  .delete('/:userId/conversations/:conversationId/messages/:messageId', async (req, res) => {
    let result = await pm.deleteMessage(req.params.userId, req.params.conversationId, req.params.messageId);

    if (!result) res.status(400).json({message: "Unable to delete message"});
    else res.status(200).json({message: "Message was deleted successfully"});
  })

module.exports = { PRIVATE_MESSAGES_API }