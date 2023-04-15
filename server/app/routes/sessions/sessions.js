// dependencies
const express = require('express');
const pm = require('../../db/private_messages_db');
const { validate } = require('../validate_ressource');
const { conversationSchema, messageSchema } = require('./validator_schemas');

// express stuff
const SESSIONS_API = express.Router();

module.exports = { SESSIONS_API };