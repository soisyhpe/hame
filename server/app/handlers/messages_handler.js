// dependencies
const express = require('express');

// express' stuff
const message_api = express.Router();

message_api
  .use(express.json())

module.exports = { message_api }