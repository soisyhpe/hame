// dependencies
const express = require('express');
const pm = require('../../db/private_messages_db');
const { validate } = require('../validate_ressource');
const { conversationSchema, messageSchema } = require('./validator_schemas');

// express stuff
const SESSIONS_API = express.Router();

SESSIONS_API
  .use(express.json())

  // sessions : login
  .get('/login', async (req, res) => {
    if (req.session.user_id) {
      res.send('');
    }
  })

  // sessions : logout
  .get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/');
  })

module.exports = { SESSIONS_API };