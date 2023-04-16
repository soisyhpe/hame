// dependencies
import { MongoClient, ServerApiVersion } from 'mongodb';

// mongodb stuff
const CLIENT = new MongoClient("mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const DATABASE_NAME = 'Hame';
const DATABASE = CLIENT.db(DATABASE_NAME);

await DATABASE.createCollection("blocked_users",
  {
    validator:
    {
      $jsonSchema:
      {
        bsonType: 'object',
        required: ["user_id", "blocked_user_id", "blocked_date"],
        properties:
        {
          _id: {},
          user_id: {
            bsonType: 'string',
            description: "'user_id' is a required field"
          },
          blocked_user_id: {
            bsonType: 'string',
            description: "'block_user_id' is a required field"
          },
          blocked_date: {
            bsonType: 'date',
            description: "'blocked_date' is a required field"
          }
        }
      }
    }
  }
)
.then((res) => res.createIndex({ user_id: 1 , blocked_user_id : 1 }, { unique: true }))
.catch((err) => console.error(`Unable de create collection 'blocked_users' : ${err}`));

const BOOKMARKS_COLLECTION = DATABASE.createCollection(
  "bookmarks",
  {

  }
).catch((err) => {});
BOOKMARKS_COLLECTION.createIndex({ message_id: 1, user_id: 1 }, { unique: true });

const CIRCLES_COLLECTION = await DATABASE.createCollection(
  "bookmarks",
  {

  }
).catch((err) => {});

const FOLLOWERS_COLLECTION = await DATABASE.createCollection(
  "followers",
  {

  }
).catch((err) => {});
FOLLOWERS_COLLECTION.createIndex({ user_id: 1 , follower_id : 1 }, { unique: true });

const FRIENDS_COLLECTION = await DATABASE.createCollection(
  "friends",
  {

  }
).catch((err) => {});
FRIENDS_COLLECTION.createIndex({ user_id: 1, friend_id: 1 }, { unique: true });

const MESSAGES_COLLECTION = await DATABASE.createCollection(
  "messages",
  {

  }
).catch((err) => {});

const LIKED_MESSAGES_COLLECTION = await DATABASE.createCollection(
  "liked_messages",
  {

  }
).catch((err) => {});
LIKED_MESSAGES_COLLECTION.createIndex({ message_id: 1, user_id: 1 }, { unique: true });

const PRIVATE_MESSAGES_COLLECTION = await DATABASE.createCollection(
  "private_messages",
  {

  }
).catch((err) => {});

const SESSIONS_COLLECTION = await DATABASE.createCollection(
  "sessions",
  {

  }
).catch((err) => {});

const USERS_COLLECTION = DATABASE.createCollection(
  "users",
  {

  }
).catch((err) => {});
USERS_COLLECTION.createIndex({ email: 1 }, { unique: true });
USERS_COLLECTION.createIndex({ username: 1 }, { unique: true });
USERS_COLLECTION.createIndex({ user_id: 1 }, { unique: true });

export { DATABASE };