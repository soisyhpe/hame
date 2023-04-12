// dependencies
const express = require('express');

// handlers
const { USERS_API } = require('./routes/users');
const { MESSAGES_API } = require('./routes/messages');
const { PRIVATE_MESSAGES_API } = require('./routes/private_messages/private_messages');
const { SAVED_MESSAGES_API } = require('./routes/saved_messages');

// express stuff
const app = express();

// local stuff
const SERVER_PORT = 8000;

app
  .use('/users', USERS_API)
  .use('/messages', MESSAGES_API)
  .use('/private-messages', PRIVATE_MESSAGES_API)
  .use('/saved-messages', SAVED_MESSAGES_API)
  .listen(SERVER_PORT, () => {
    console.log(`[HAME SERVER] API running at http://localhost:${SERVER_PORT}/`)
  });