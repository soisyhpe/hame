// dependencies
import { MongoClient, ServerApiVersion } from 'mongodb';

// mongodb stuff
const CLIENT = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
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
).then((res) => res.createIndex({ user_id: 1 , blocked_user_id : 1 }, { unique: true }))
.catch((err) => console.warn(`Unable to create collection 'blocked_users'. ${err}`));

await DATABASE.createCollection("bookmarks",
  {

  }
).then((res) => res.createIndex({ message_id: 1, user_id: 1 }, { unique: true }))
.catch((err) => console.warn(`Unable to create collection 'bookmarks'. ${err}`));

await DATABASE.createCollection("circles",
  {

  }
).catch((err) => console.warn(`Unable to create collection 'circles'. ${err}`));

await DATABASE.createCollection("followers",
  {

  }
).then((res) => res.createIndex({ user_id: 1 , follower_id : 1 }, { unique: true }))
.catch((err) => console.warn(`Unable to create collection 'followers'. ${err}`));

await DATABASE.createCollection("friends",
  {

  }
)
.then((res) => res.createIndex({ user_id: 1, friend_id: 1 }, { unique: true }))
.catch((err) => console.warn(`Unable to create collection 'friends'. ${err}`));

await DATABASE.createCollection("messages",
  {

  }
).catch((err) => console.warn(`Unable to create collection 'messages'. ${err}`));

await DATABASE.createCollection("liked_messages",
  {

  }
)
.then((res) => res.createIndex({ message_id: 1, user_idz: 1 }, { unique: true }))
.catch((err) => console.warn(`Unable to create collection 'liked_messages'. ${err}`));

await DATABASE.createCollection("private_messages",
  {

  }
).catch((err) => console.warn(`Unable to create collection 'private_messages'. ${err}`));

await DATABASE.createCollection("sessions",
  {

  }
).catch((err) => console.warn(`Unable to create collection 'sessions'. ${err}`));

await DATABASE.createCollection("users",
  {

  }
)
.then((res) => {
  res.createIndex({ email: 1 }, { unique: true });
  res.createIndex({ username: 1 }, { unique: true });
  res.createIndex({ user_id: 1 }, { unique: true });
})
.catch((err) => console.warn(`Unable to create collection 'users'. ${err}`));

const BLOCKED_USERS_COLLECTION = DATABASE.collection("blocked_users");
const BOOKMARKS_COLLECTION = DATABASE.collection("bookmarks");
const CIRCLES_COLLECTION = DATABASE.collection("circles");
const FOLLOWERS_COLLECTION = DATABASE.collection("followers");
const FRIENDS_COLLECTION = DATABASE.collection("friends");
const MESSAGES_COLLECTION = DATABASE.collection("messages");
const LIKED_MESSAGES_COLLECTION = DATABASE.collection("messages");
const PRIVATE_MESSAGES_COLLECTION = DATABASE.collection("private_messages");
const USERS_COLLECTION = DATABASE.collection("users");

export default { DATABASE };
export { BLOCKED_USERS_COLLECTION, BOOKMARKS_COLLECTION, CIRCLES_COLLECTION, FOLLOWERS_COLLECTION, FRIENDS_COLLECTION, MESSAGES_COLLECTION, LIKED_MESSAGES_COLLECTION, PRIVATE_MESSAGES_COLLECTION, USERS_COLLECTION };