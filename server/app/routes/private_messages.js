// dependencies
const express = require('express');
const pm = require('../db/private_messages_db');

// express' stuff
const PRIVATE_MESSAGES_API = express.Router();




/**
 * conversation structure :
 * {
 *   _id: ...
 *   author: userId2
 *   participants: [
 *     userId1, userId2
 *   ],
 *   events: [
 *     {
 *       type: "{groupRenamed}"
 *       timestamp: ...
 *     }
 *   ],
 *   messages: [
 *     {
 *       author: userId1
 *       content: "voilà un message"
 *       timestamp: ...
 *     },
 *     {
 *       author: userId2
 *       content: "voilà une réponse"
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