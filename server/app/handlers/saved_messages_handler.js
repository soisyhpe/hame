// dependencies
const express = require('express');

// express' stuff
const SAVED_MESSAGES_API = express.Router();

SAVED_MESSAGES_API
  .use(express.json())

  // get all saved messages from a userId
  .get('/:userId/messages', (req, res) => {

  })

  // post a message to saved messages
  .post('/:userId/messages/', (req, res) => {

  })

  // delete a message from saved messages
  .delete('/:userId/messages/:messageId', (req, res) => {

  })

module.exports = { SAVED_MESSAGES_API }