// dependencies
const express = require('express');

// handlers
const { USERS_API } = require('./routes/users/users');
const { FRIENDS_API } = require('./routes/friends/friends');
const { FOLLOWERS_API } = require('./routes/followers/followers');
const { BLOCKED_USERS_API } = require('./routes/blocked-users/blocked_users');
const { PRIVATE_MESSAGES_API } = require('./routes/private-messages/private_messages');
const { MESSAGES_API } = require('./routes/messages/messages');
const { BOOKMARKS_API } = require('./routes/bookmarks/bookmarks');
const { CIRCLES_API } = require('./routes/circles/circles');

// express stuff
const app = express();

// local stuff
const SERVER_PORT = 8000;
const BASE = '/v1'

app
  .use(BASE + '/users', USERS_API)
  .use(BASE + '/friends', FRIENDS_API)
  .use(BASE + '/followers', FOLLOWERS_API)
  .use(BASE + '/blocked-users', BLOCKED_USERS_API)
  .use(BASE + '/private-messages', PRIVATE_MESSAGES_API)
  .use(BASE + '/messages', MESSAGES_API)
  .use(BASE + '/bookmarks', BOOKMARKS_API)
  .use(BASE + '/circles', CIRCLES_API)
  .listen(SERVER_PORT, () => {
    console.log(`[HAME SERVER] API running at http://localhost:${SERVER_PORT}/`)
  });

/*async function run() {
  try {
    // connect the client to the server
    await CLIENT.connect().then(init);
  } finally {
    // ensure that the client will close when you finish/error
    await CLIENT.close();
  }
}*/