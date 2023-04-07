// dependencies
const express = require('express');

// handlers
const { USERS_API } = require('./handlers/users_handler');
const { MESSAGES_API } = require('./handlers/messages_handler');
const { PRIVATE_MESSAGES_API } = require('./handlers/private_messages_handler');

// express' stuff
const app = express();

app
  .use('/users', USERS_API)
  .use('/messages', MESSAGES_API)
  .use('/private-messages', PRIVATE_MESSAGES_API)
  .listen(8000);