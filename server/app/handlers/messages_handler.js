// dependencies
const express = require('express');

// express' stuff
const MESSAGES_API = express.Router();

MESSAGES_API
  .use(express.json())

  // get all messages
  .get('/', (req, res) => {

  })

  // get all messages from user id
  .get('/:userId', (req, res) => {

  })

  // get a specific message from its id
  .get('/:messageId', (req, res) => {
    
  })

  // post a new message
  .post('/', (req, res) => {

  })

  // delete a message
  .delete('/:messageId', (req, res) => {

  })

  // put a message (modify a message)
  .put('/:messageId', (req, res) => {

  })

module.exports = { MESSAGES_API }