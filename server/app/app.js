// dependencies
const express = require('express');

// handlers
const { userAPI } = require('./handlers/users_handler');
const { messageAPI } = require('./handlers/messages_handler');
const { privateMessageAPI } = require('./handlers/private_messages_handler');

// express' stuff
const app = express();

app
  .use('/users', usersAPI)
  .use('/messages', messagesAPI)
  .use('/private-messages', privateMessagesAPI)
  .listen(8000);