// dependencies
const express = require('express');
// const cookieParser = require("cookie-parser");
const session = require('express-session');
require('dotenv').config();

// handlers
const { BLOCKED_USERS_API } = require('./routes/blocked-users/blocked_users');
const { BOOKMARKS_API } = require('./routes/bookmarks/bookmarks');
const { CIRCLES_API } = require('./routes/circles/circles');
const { FOLLOWERS_API } = require('./routes/followers/followers');
const { FRIENDS_API } = require('./routes/friends/friends');
const { MESSAGES_API } = require('./routes/messages/messages');
const { PRIVATE_MESSAGES_API } = require('./routes/private-messages/private_messages');
const { SESSIONS_API } = require('./routes/sessions/sessions');
const { USERS_API } = require('./routes/users/users');

// express stuff
const app = express();

// local stuff
const BASE = '/v1'
const SERVER_PORT = 8000;

app
  .use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { 
      maxAge: 60 * 60 * 24 * 1000 // = 24h in milliseconds
    },
    resave: false,
    saveUninitialized: true
  }))

  .use(BASE + '/blocked-users', BLOCKED_USERS_API)
  .use(BASE + '/bookmarks', BOOKMARKS_API)
  .use(BASE + '/circles', CIRCLES_API)
  .use(BASE + '/followers', FOLLOWERS_API)
  .use(BASE + '/friends', FRIENDS_API)
  .use(BASE + '/messages', MESSAGES_API)
  .use(BASE + '/private-messages', PRIVATE_MESSAGES_API)
  .use(BASE + '/sessions', SESSIONS_API)
  .use(BASE + '/users', USERS_API)

  .listen(SERVER_PORT, () => {
    console.log(`[HAME SERVER] API running at http://localhost:${SERVER_PORT}/`)
  });