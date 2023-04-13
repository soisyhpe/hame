// dependencies
const express = require('express');

// express' stuff
const BOOKMARKS_API = express.Router();

BOOKMARKS_API
  .use(express.json())

  // get all saved messages from a userId
  .get('/:userId/bookmarks', (req, res) => {

  })

  // post a message to saved messages
  .post('/:userId/bookmarks/', (req, res) => {

  })

  // delete a message from saved messages
  .delete('/:userId/bookmarks/:messageId', (req, res) => {

  })

module.exports = { BOOKMARKS_API }