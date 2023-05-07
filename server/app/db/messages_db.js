// dependencies
import { randomUUID } from 'crypto';
import { MESSAGES_COLLECTION, LIKED_MESSAGES_COLLECTION } from '../db_connection.js';

async function getMessages(limit=10, keywords="") {
  if (keywords == "")
    return await MESSAGES_COLLECTION.find().sort({ creation_date: -1 }).limit(limit).toArray();

  const regxp= new RegExp(keywords, 'i');
  let results = await MESSAGES_COLLECTION.find({text : {$regex : regxp}}).sort({ creation_date: -1 }).limit(limit).toArray();
  return results;
}

async function getMessagesFromUser(userId, limit=10) {
  let query = { user_id: userId };
  let results = await MESSAGES_COLLECTION.find(query).limit(limit).toArray();

  return results;
}

async function getMessageFromId(messageId) {
  let query = { message_id: messageId };
  let results = await MESSAGES_COLLECTION.findOne(query).toArray();

  return results;
}

async function sendMessage(userId, text, replyTo, repostedFrom, place, media, source, scope, creationDate) {
  let msgid= randomUUID();
  let newMessage = {
    user_id: userId,
    message_id: msgid,
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
  console.log(replyTo, repostedFrom)

  // if replyTo or repostedFrom are undefined, then resolve all promises 
  let result = await Promise.all([await MESSAGES_COLLECTION.insertOne(newMessage),
    replyTo !== undefined ? await MESSAGES_COLLECTION.updateOne({ message_id: replyTo }, { $inc: { reply_count: 1 } }) : Promise.resolve(),
    repostedFrom !== undefined ? await MESSAGES_COLLECTION.updateOne({ message_id: repostedFrom }, { $inc: { repost_count: 1 } }) : Promise.resolve()
  ]);


  console.log(result);
  if (!result){
    console.log("Message not posted");
    return false;
  } else {
    return newMessage;
  }
}

// todo : send multiple messages (thread feature)

async function deleteMessage(messageId, userId) {
  if (await MESSAGES_COLLECTION.findOne({ message_id: messageId, user_id: userId }) == null) {
    console.log("Message not found or not owned by user");
    return false;
  }

  MESSAGES_COLLECTION.findOne({ message_id: messageId }).then((message) => {
    // if message is a reply : decrease reply_count of replied_to message
    if (message.replied_to != '') {
      MESSAGES_COLLECTION.updateOne({ message_id: message.replied_to }, { $inc: { reply_count: -1 } });
    }
    // if message is a repost : decrease repost_count of reposted_from message
    if (message.reposted_from != '') {
      MESSAGES_COLLECTION.updateOne({ message_id: message.reposted_from }, { $inc: { repost_count: -1 } });
    }
  });

  let query = { message_id: messageId, user_id: userId };
  let result = await MESSAGES_COLLECTION.deleteOne(query);

  return result;
}

async function getResponses(messageId, limit=10) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let query = { reply_to: messageId };
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function likeMessage(messageId, userId, creationDate) {
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

  let result = await Promise.all([LIKED_MESSAGES_COLLECTION.insertOne(newLike), MESSAGES_COLLECTION.updateOne(query, update)]);

  return result;
}

async function unlikeMessage(messageId, userId) {
  let query = { message_id: messageId, user_id: userId };
  let update = { $inc: { like_count: -1 } }; // potential issue : negative like counts
  console.log("hehe yea");
  if (await LIKED_MESSAGES_COLLECTION.findOne({ message_id: messageId, user_id: userId }) == null) {
    //console.log("Message not liked by user");
    return false;
  }
  let result = await Promise.all([LIKED_MESSAGES_COLLECTION.deleteOne(query), MESSAGES_COLLECTION.updateOne(query, update)]);

  return result;
}

async function isLikedBy(messageId, userId) {
  
  let query = { message_id: messageId, user_id: userId };
  console.log(query);
  let result = await LIKED_MESSAGES_COLLECTION.findOne(query);
  console.log(result!=null);


  return result != null;
}

async function likingUsers(messageId, limit=10) {
  let query = { message_id: messageId };
  let projection = { user_id: 1 };
  let results = await LIKED_MESSAGES_COLLECTION.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function likedMessages(userId, limit=10) {
  let query = { user_id: userId };
  let projection = { message_id: 1 };
  let results = await LIKED_MESSAGES_COLLECTION.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function repostingUsers(messageId, limit=10) {
  let query = { reposted_from: messageId };
  let projection = { user_id: 1 };
  let results = await MESSAGES_COLLECTION.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function repostedMessages(messageId, limit=10) {
  let query = { reposted_from: messageId };
  let projection = { message_id: 1} ;
  let results = await MESSAGES_COLLECTION.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function repostedMessagesofUser(userId, limit=10){
  let query = { user_id: userId , reposted: true};
  let projection = { message_id: 1 };
  let results = await MESSAGES_COLLECTION.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function modifyMessage(messageId, userId, text, place, media, lastModified) {
  // not sure about userId check maybe only messageId is enough
  let query = { message_id: messageId , user_id: userId };
  let update = { $set: { text: text, place: place, media: media, last_modified: lastModified} };
  let result = await MESSAGES_COLLECTION.updateOne(query, update);

  return result.modifiedCount > 0;
}

export { getMessages, getMessagesFromUser, getMessageFromId, sendMessage, getResponses, deleteMessage, likeMessage, isLikedBy, unlikeMessage, likingUsers, likedMessages, repostingUsers, repostedMessages, modifyMessage, repostedMessagesofUser };