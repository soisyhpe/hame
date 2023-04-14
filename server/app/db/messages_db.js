// dependencies
const { randomUUID, randomBytes } =  require('crypto');
const { DATABASE } = require('../app');

// local stuff
const COLLECTION_NAME = "messages";
const LIKED_MESSAGES_COLLECTION_NAME = "liked_messages";

async function getMessages(limit=10) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {};
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function getMessagesFromUser(userId, limit=10) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId};
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function getMessageFromId(messageId) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {message_id: messageId};
  let results = await collection.findOne(query).toArray();

  return results;
}

async function sendMessage(userId, text, replyTo, repostedFrom, place, media, source, scope, creationDate) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
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
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {message_id: messageId, user_id: userId};
  let result = Promise.all[await collection.drop(query)];
  // todo : decrease reply_count of replied_to message and repost_count of reposted_from message

  return result;
}

async function getResponses(messageId, limit=10) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {reply_to: messageId};
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function likeMessage(messageId, userId, creationDate) {
  let collection = await DATABASE.collection(LIKED_MESSAGES_COLLECTION_NAME);
  let collection2 = await DATABASE.collection(COLLECTION_NAME);
  let newLike = {
    message_id: messageId,
    user_id: userId,
    creation_date: creationDate
  };
  let query = {
    message_id: messageId
  };
  let update = {
    $inc: { like_count: 1 }
  };
  let result = await Promise.all[collection.insertOne(newLike), collection2.updateOne(query, update)];

  return result;
}

async function unlikeMessage(messageId, userId) {
  let collection = await DATABASE.collection(LIKED_MESSAGES_COLLECTION_NAME);
  let collection2 = await DATABASE.collection(COLLECTION_NAME);
  let query = {
    message_id: messageId,
    user_id: userId
  };
  let update = {
    $inc: { like_count: -1 } // potential issue : negative like counts
  };
  let result = await Promise.all[collection.drop(query), collection2.updateOne(query, update)];

  return result;
}

async function likingUsers(messageId, limit=10) {
  let collection = await DATABASE.collection(LIKED_MESSAGES_COLLECTION_NAME);
  let query = { message_id: messageId };
  let projection = { user_id: 1 };
  let results = await collection.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function likedMessages(userId, limit=10) {
  let collection = await DATABASE.collection(LIKED_MESSAGES_COLLECTION_NAME);
  let query = { user_id: userId };
  let projection = { message_id: 1 };
  let results = await collection.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function repostingUsers(messageId, limit=10) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = { reposted_from: messageId };
  let projection = {user_id: 1};
  let results = await collection.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function repostedMessages(messageId, limit=10) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {reposted_from: messageId};
  let projection = {message_id: 1};
  let results = await collection.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function modifyMessage(messageid, newMessage) {
    if (messageid === null || newMessage === null || messageid === undefined || newMessage === undefined || messageid === "" || newMessage === "") {
        console.log("Invalid messageid or newMessage");
        return false;
    }
    const query = { "messageid": messageid };
    newvalues = { $set: { "message": newMessage } };

    const result = await messages.updateOne(query, newvalues);

    if (result.modifiedCount == 0) {
        console.log("Failed to modify message");
        return false;
    }

    console.log(`Updated ${result.modifiedCount} document(s)`);
    return true;
}

module.exports = { getMessages, getMessagesFromUser, getMessageFromId, sendMessage, getResponses, deleteMessage, likeMessage, unlikeMessage, likingUsers, likedMessages, repostingUsers, repostedMessages };