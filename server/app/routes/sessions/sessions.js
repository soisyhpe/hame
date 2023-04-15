// dependencies
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const pm = require('../../db/private_messages_db');
const { validate } = require('../validate_ressource');
const { conversationSchema, messageSchema } = require('./validator_schemas');

// express stuff
const SESSIONS_API = express.Router();

SESSIONS_API
  .use(express.json())

  // sessions : login
  .get('/', async (req, res) => {
    let session = req.session;
    
    if (session.user_id) {
      res.send('');
    }
  })

  // sessions : logout
  .get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/');
  })

module.exports = { SESSIONS_API };