// dependencies
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

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

// mongodb stuff
const URI = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority"; // todo URI via .env
const CLIENT = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const DATABASE_NAME = 'HAME';
const DATABASE = CLIENT.db(DATABASE_NAME);

// local stuff
const SERVER_PORT = 8000;
const BASE = 'v1'

async function init() {
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
}

async function run() {
  try {
    // connect the client to the server
    await CLIENT.connect().then(init);
  } finally {
    // ensure that the client will close when you finish/error
    await CLIENT.close();
  }
}

run();

module.exports = { DATABASE };