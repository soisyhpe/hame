// dependencies
const express = require('express');

// handlers
const { USERS_API } = require('./routes/users');
const { MESSAGES_API } = require('./routes/messages');
const { PRIVATE_MESSAGES_API } = require('./routes/private_messages');
const { SAVED_MESSAGES_API } = require('./routes/saved_messages');

// express' stuff
const app = express();

app
  .use('/users', USERS_API)
  .use('/messages', MESSAGES_API)
  .use('/private-messages', PRIVATE_MESSAGES_API)
  .use('/saved-messages', SAVED_MESSAGES_API)
  .listen(8000);