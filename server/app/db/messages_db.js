// dependencies
const { randomUUID, randomBytes } =  require('crypto');
const { DATABASE } = require('../db_connection');

// local stuff
const COLLECTION_NAME = "messages";
const LIKED_MESSAGES_COLLECTION_NAME = "liked_messages";
DATABASE.collection(LIKED_MESSAGES_COLLECTION_NAME).createIndex({ message_id: 1, user_id: 1 }, { unique: true });

async function getMessages(limit=10) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let results = await collection.find().limit(limit).toArray();

  return results;
}

async function getMessagesFromUser(userId, limit=10) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let query = { user_id: userId };
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function getMessageFromId(messageId) {
  let collection =  DATABASE.collection(COLLECTION_NAME);
  let query = { message_id: messageId };
  let results = await collection.findOne(query).toArray();

  return results;
}

async function sendMessage(userId, text, replyTo, repostedFrom, place, media, source, scope, creationDate) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let newMessage = {
    user_id: userId,
    message_id: randomUUID(),
    text: text,
    replied_to: replyTo,
    reposted_from: repostedFrom,
    place: place,
    media: media,
    source: source,
    reply_count: 0,
    repost_count: 0,
    like_count: 0,
    reposted: false,
    liked: false,
    scope: scope,
    last_modified: creationDate,
    creation_date: creationDate
  };
  let result = Promise.all[await collection.insertOne(newMessage),
    replyTo != '' ? await collection.updateOne({ message_id: replyTo }, { $inc: { reply_count: 1 } }) : null,
    repostedFrom != '' ? await collection.updateOne({ message_id: repostedFrom }, { $inc: { repost_count: 1 } }) : null
  ];

  return result;
}

// todo : send multiple messages (thread feature)

async function deleteMessage(messageId, userId) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  if (await collection.findOne({ message_id: messageId, user_id: userId }) == null) {
    console.log("Message not found or not owned by user");
    return false;
  }

  collection.findOne({ message_id: messageId }).then((message) => {
    // if message is a reply : decrease reply_count of replied_to message
    if (message.replied_to != '') {
      collection.updateOne({ message_id: message.replied_to }, { $inc: { reply_count: -1 } });
    }
    // if message is a repost : decrease repost_count of reposted_from message
    if (message.reposted_from != '') {
      collection.updateOne({ message_id: message.reposted_from }, { $inc: { repost_count: -1 } });
    }
  });

  let query = { message_id: messageId, user_id: userId };
  let result = await collection.deleteOne(query);

  return result;
}

async function getResponses(messageId, limit=10) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let query = { reply_to: messageId };
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function likeMessage(messageId, userId, creationDate) {
  let collection =DATABASE.collection(LIKED_MESSAGES_COLLECTION_NAME);
  let collection2 =DATABASE.collection(COLLECTION_NAME);
  let newLike = { message_id: messageId,
    user_id: userId,
    creation_date: creationDate
  };
  let query = { message_id: messageId };
  let update = { $inc: { like_count: 1 } };
  // check if liked entry already exists
  // if (await collection.findOne({ message_id: messageId, user_id: userId }) != null) {
    //console.log("Message already liked by user");
    // return false;
  // }

  let result = await Promise.all[collection.insertOne(newLike), collection2.updateOne(query, update)];

  return result;
}

async function unlikeMessage(messageId, userId) {
  let collection =  DATABASE.collection(LIKED_MESSAGES_COLLECTION_NAME);
  let collection2 = DATABASE.collection(COLLECTION_NAME);
  let query = { message_id: messageId, user_id: userId };
  let update = { $inc: { like_count: -1 } }; // potential issue : negative like counts
  if (await collection.findOne({ message_id: messageId, user_id: userId }) == null) {
    //console.log("Message not liked by user");
    return false;
  }
  let result = await Promise.all[collection.drop(query), collection2.updateOne(query, update)];

  return result;
}

async function likingUsers(messageId, limit=10) {
  let collection = DATABASE.collection(LIKED_MESSAGES_COLLECTION_NAME);
  let query = { message_id: messageId };
  let projection = { user_id: 1 };
  let results = await collection.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function likedMessages(userId, limit=10) {
  let collection = DATABASE.collection(LIKED_MESSAGES_COLLECTION_NAME);
  let query = { user_id: userId };
  let projection = { message_id: 1 };
  let results = await collection.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function repostingUsers(messageId, limit=10) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let query = { reposted_from: messageId };
  let projection = { user_id: 1 };
  let results = await collection.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function repostedMessages(messageId, limit=10) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let query = { reposted_from: messageId };
  let projection = { message_id: 1} ;
  let results = await collection.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function modifyMessage(messageId,userId, text, place, media, lastModified) {
  // not sure about userId check maybe only messageId is enough
  let collection = DATABASE.collection(COLLECTION_NAME);
  let query = { message_id: messageId , user_id: userId };
  let update = { $set: { text: text, place: place, media: media , last_modified:  lastModified} };

  let result=await collection.updateOne(query, update);

  return result.modifiedCount>0;
}



module.exports = { getMessages, getMessagesFromUser, getMessageFromId, sendMessage, getResponses, deleteMessage, likeMessage, unlikeMessage, likingUsers, likedMessages, repostingUsers, repostedMessages, modifyMessage };