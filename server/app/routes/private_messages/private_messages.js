// dependencies
const express = require('express');
const pm = require('../../db/private_messages_db');
const { validateConversation, validateMessage } = require('./validate_ressource');
const { conversationSchema, messageSchema } = require('./validator');

// express stuff
const PRIVATE_MESSAGES_API = express.Router();

PRIVATE_MESSAGES_API
  .use(express.json())

  // get all private conversations
  .get('/:user_id', async (req, res) => {
    let result = pm.getConversations(req.params.user_id);

    if (!result) res.status(400).json({message: "No private conversations was found"});
    else res.status(200).json(result);
  })
  
  // get all requests for private conversations
  .get('/:user_id/requests', async (req, res) => {
    let result = await pm.getConversations(req.params.user_id, true);

    if (!result) res.status(400).json({message: "No requests for private conversations was found"});
    else res.status(200).json(result);
  })

  // post a new conversation
  .post('/:author_id/conversations/', validateConversation(conversationSchema), async (req, res) => {
    let result = await pm.createConversation(req.params.author_id, req.body.participants, req.body.creation_date);

    if (!result) res.status(400).json({message: "Unable to create a new conversation"});
    else res.status(200).json({message: "New conversation was created successfully"});
  })
 
  // get all messages from a conversation
  .get('/:author_id/conversations/:conversation_id/messages', async (req, res) => {
    let result = await pm.getMessages(req.params.author_id, req.params.conversation_id);

    if (!result) res.status(400).json({message: "No messages was found"});
    else res.status(200).json(result);
  })

  // post a new message
  .post('/:author_id/conversations/:conversation_id/messages/', validateMessage(messageSchema), async (req, res) => {
    let result = await pm.sendMessage(req.params.author_id, req.body.content, req.body.type, req.body.reply_to, req.body.is_read, req.params.conversation_id, req.body.sent_date);

    if (!result) res.status(400).json({message: "Unable to post a new message"});
    else res.status(200).json({message: "Message was posted successfully"});
  })

  // delete a message
  .delete('/:author_id/conversations/:conversation_id/messages/:message_id', async (req, res) => {
    let result = await pm.deleteMessage(req.params.author_id, req.params.conversation_id, req.params.message_id);

    if (!result) res.status(400).json({message: "Unable to delete message"});
    else res.status(200).json({message: "Message was deleted successfully"});
  })

module.exports = { PRIVATE_MESSAGES_API }