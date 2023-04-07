// dependencies
const express = require('express');

// express' stuff
const PRIVATE_MESSAGES_API = express.Router();

PRIVATE_MESSAGES_API
  .use(express.json())

  // get all private conversations of user
  .get('/:userId', (req, res) => {

  })
  
  // get all requests private conversations of user
  .get('/:userId/requests', (req, res) => {

  })
 
  // get a specific conversation from its id
  .get('/:userId/conversations/:conversationId', (req, res) => {
    
  })

  // get all messages from a conversation
  .get('/:userId/conversations/:conversationId/messages', (req, res) => {

  })

  // post a new message
  .post('/:userId/conversations/:conversationId/messages/', (req, res) => {

  })

  // delete a message
  .delete('/:userId/conversations/:conversationId/messages/:messageId', (req, res) => {

  })

module.exports = { PRIVATE_MESSAGES_API }