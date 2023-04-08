// dependencies
const express = require('express');
const pm = require('../db/private_messages_db');
const { UUID_REGEX } = require('../tools/http_validation_tools');
const { object, string, number, array, boolean, date } = require('yup');

// express' stuff
const PRIVATE_MESSAGES_API = express.Router();

// local stuff
let conversationSchema = object(
  {
    author_id: number()
      .positive()
      .required(),
    participants: array()
      .min(2, 'conversation with participants lower than 2 is not allowed')
      .max(2, 'actually, you cannot create conversation with more than 2 participants')
      .required(),
    creation_date: date()
      .required()
  }
)
let messageSchema = object(
  {
    author_id: number()
      .positive()
      .required(),
    content: string()
      .min(1, 'content with no length is not allowed')
      .max(256, 'content maximum length should be lower than 256 characters')
      .required(),
    type: string()
      .oneOf(['TEXT', 'FILE', 'VOICE', 'PICTURE', 'VIDEO'], 'wrong type')
      .default(() => "TEXT")
      .optional(),
    reply_to: string()
      .matches(UUID_REGEX, 'reply_to should contains a valid UUID')
      .required(),
    is_read: boolean()
      .default(() => false)
      .optional(),
    conversation_id: string()
      .matches(UUID_REGEX, 'conversation_id should contains a valid UUID')
      .required(),
    sent_date: date()
      .required()
  }
)




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

    try {
      let parsedMessage = await messageSchema.validate({
        author_id: req.params.userId,
        content: content,
        type: type,
        reply_to: reply_to,
        is_read: is_read,
        conversation_id: conversation_id,
        sent_date: sent_date
      });
    } catch (err) {
      res.status(500).json({type: err.name, message: err.message})
    }

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