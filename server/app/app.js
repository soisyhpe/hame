// dependencies
import express from 'express';
// import cookieParser from 'cookie-parser';
import session from 'express-session';
import babel from '@babel/core';
import 'dotenv/config.js';

// express stuff
const app = express();

// babel stuff
/* babel.transform("code", {
  presets: ["@babel/preset-en"]
}); */

// dotenv stuff (useless since importing dotenv/config.js)
// dotenv.config();

// local stuff
const BASE = '/v1'
const SERVER_PORT = 8000;

// handlers
import { BLOCKED_USERS_API } from './routes/blocked-users/blocked_users.js';
import { BOOKMARKS_API } from './routes/bookmarks/bookmarks.js';
import { CIRCLES_API } from './routes/circles/circles.js';
import { FOLLOWERS_API } from './routes/followers/followers.js';
import { FRIENDS_API } from './routes/friends/friends.js';
import { MESSAGES_API } from './routes/messages/messages.js';
import { PRIVATE_MESSAGES_API } from './routes/private-messages/private_messages.js';
import { SESSIONS_API } from './routes/sessions/sessions.js';
import { USERS_API } from './routes/users/users.js';

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