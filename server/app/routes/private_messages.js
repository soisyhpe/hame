// dependencies
const express = require('express');
const pm = require('../db/private_messages_db');

// express' stuff
const PRIVATE_MESSAGES_API = express.Router();




/**
 * conversation structure :
 * {
 *   _id: ...
 *   conversation_id: ...
 *   author: user_id2
 *   participants: [
 *     user_id1, user_id2
 *   ],
 *   messages: [
 *     {
 *       message_id: ...
 *       author: user_id1
 *       content: "voilà un message"
 *       reply_to: message_id
 *       is_read: boolean
 *       timestamp: ...
 *     },
 *     {
 *       message_id: ...
 *       author: user_id2
 *       content: "voilà une réponse"
 *       reply_to: message_id
 *       is_read: boolean
 *       timestamp: ...
 *     }
 *   ]
 *   timestamp: ...
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
    let result = pm.getConversations(req.params.userId, true);

    if (!result) res.status(400).json({message: "No requests for private conversations was found"});
    else res.status(200).json(result);
  })
 
  // get all messages from a conversation
  .get('/:userId/conversations/:conversationId/messages', async (req, res) => {
    let result = pm.getMessages(req.params.userId, req.params.conversationId);

    if (!result) res.status(400).json({messages: "No messages was found"});
    else res.status(200).json(result)
  })

  // post a new message
  .post('/:userId/conversations/:conversationId/messages/', async (req, res) => {

  })

  // delete a message
  .delete('/:userId/conversations/:conversationId/messages/:messageId', async (req, res) => {

  })

module.exports = { PRIVATE_MESSAGES_API }