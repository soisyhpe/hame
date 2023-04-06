// dependencies
const express = require('express');

// handlers
const { user_api } = require('./handlers/users_handler');
const { message_api } = require('./handlers/messages_handler');

// express' stuff
const app = express();

app
  .all('/user', user_api)
  .all('/message', message_api)
  .listen(8000);