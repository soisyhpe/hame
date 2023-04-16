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
    validator:
    {
      $jsonSchema:
      {
        bsonType: 'object',
        required: ["user_id", "message_id", "creation_date"],
        properties:
        {
          _id: {},
          bookmark_id: {
            bsonType: 'string',
            description: "'bookmark_id' is a required field"
          },
          message_id: {
            bsonType: 'string',
            description: "'message_id' is a required field"
          },
          creation_date: {
            bsonType: 'date',
            description: "'creation_date' is a required field"
          }
        }
      }
    }
  }
).then((res) => res.createIndex({ message_id: 1, user_id: 1 }, { unique: true }))
.catch((err) => console.warn(`Unable to create collection 'bookmarks'. ${err}`));

await DATABASE.createCollection("circles",
  {
    validator:
    {
      $jsonSchema:
      {
        bsonType: 'object',
        required: ["user_id", "circle_id", "creation_date"],
        properties:
        {
          _id: {},
          user_id: {
            bsonType: 'string',
            description: "'user_id' is a required field"
          },
          circle_id: {
            bsonType: 'string',
            description: "'circle_id' is a required field"
          },
          creation_date: {
            bsonType: 'date',
            description: "'creation_date' is a required field"
          }
        }
      }
    }
  }
).catch((err) => console.warn(`Unable to create collection 'circles'. ${err}`));

await DATABASE.createCollection("followers",
  {
    validator:
    {
      $jsonSchema:
      {
        bsonType: 'object',
        required: ["user_id", "follower_id", "creation_date"],
        properties:
        {
          _id: {},
          bookmark_id: {
            bsonType: 'string',
            description: "'bookmark_id' is a required field"
          },
          follower_id: {
            bsonType: 'string',
            description: "'follower_id' is a required field"
          },
          creation_date: {
            bsonType: 'date',
            description: "'creation_date' is a required field"
          }
        }
      }
    }
  }
).then((res) => res.createIndex({ user_id: 1 , follower_id : 1 }, { unique: true }))
.catch((err) => console.warn(`Unable to create collection 'followers'. ${err}`));

await DATABASE.createCollection("friends",
  {
    validator:
    {
      $jsonSchema:
      {
        bsonType: 'object',
        required: ["user_id", "friend_id", "creation_date"],
        properties:
        {
          _id: {},
          bookmark_id: {
            bsonType: 'string',
            description: "'bookmark_id' is a required field"
          },
          friend_id: {
            bsonType: 'string',
            description: "'friend_id' is a required field"
          },
          creation_date: {
            bsonType: 'date',
            description: "'creation_date' is a required field"
          }
        }
      }
    }
  }
)
.then((res) => res.createIndex({ user_id: 1, friend_id: 1 }, { unique: true }))
.catch((err) => console.warn(`Unable to create collection 'friends'. ${err}`));

await DATABASE.createCollection("messages",
  {
    validator:
    {
      $jsonSchema:
      {
        bsonType: 'object',
        required: ["user_id", "message_id", "text", "source", "scope", "creation_date"],
        properties:
        {
          _id: {},
          user_id: {
            bsonType: 'string',
            description: "'user_id' is a required field"
          },
          message_id: {
            bsonType: 'string',
            description: "'message_id' is a required field"
          },
          text: {
            bsonType: 'string',
            description: "'text' is a required field"
          },
          replied_to: {
            bsonType: 'string',
            description: "'replied_to' is a required field"
          },
          reposted_from: {
            bsonType: 'string',
            description: "'reposted_from' is a required field"
          },
          place: {
            bsonType: 'object',
            required: ["position", "country", "country_code", "city"],
            properties:
            {
              position: {
                bsonType: 'object',
                required: ["latitude", "longitude", "altitude"],
                properties:
                {
                  latitude: {
                    bsonType: 'double',
                    minimum: '-90',
                    maximum: '90',
                    description: ''
                  },
                  longitude: {
                    bsonType: 'double',
                    minimum: '-180',
                    maximum: '180',
                    description: ''
                  },
                  altitude: {
                    bsonType: 'double',
                    minimum: '-414',
                    maximum: '8848',
                    description: ''
                  },
                }
              },
              country: {
                bsonType: 'string',
                description: "'place.country' is a required field"
              },
              country_code: {
                bsonType: 'string',
                description: "'place.country_code' is a required field"
              },
              city: {
                bsonType: 'string',
                description: "'place.city' is a required field"
              },
              street: {
                bsonType: 'string'
              },
              postal_code: {
                bsonType: 'int'
              }
            }
          },
          media: {
            bsonType: 'object',
            properties:
            {
              type: {
                enum: ["image", "video", "gid", "website"],
                description: "'media.type' must be either image, video, gif or website"
              },
              url: {
                bsonType: 'string',
                description: "'media.url' is a required field"
              }
            }
          },
          source: {
            bsonType: 'string',
            description: "'source' is a required field"
          },
          scope: {
            enum: ["default", "circles"],
            description: "'scope' must be either default or circles"
          },
          creation_date: {
            bsonType: 'date',
            description: "'creation_date' is a required field"
          }
        }
      }
    }
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