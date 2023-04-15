// dependencies
const { randomUUID } = require('crypto');
const { DATABASE } = require('../db_connection');

// local stuff
const COLLECTION_NAME = "bookmarks";
DATABASE.collection(COLLECTION_NAME).createIndex({ message_id: 1, user_id: 1 }, { unique: true });


async function getBookmarks(userId, limit=10) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId};
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function addBookmark(userId, messageId, creationDate) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let newBookmark = {
    user_id: userId,
    message_id: messageId,
    bookmark_id: randomUUID(),
    creation_date: creationDate
  };
  let result = await collection.insertOne(newBookmark);

  return result;
}

async function deleteBookmark(userId, bookmarkId) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId, bookmark_id: bookmarkId};
  let result = await collection.deleteOne(query);

  return result.deletedCount > 0;
}

module.exports = { getBookmarks, addBookmark, deleteBookmark };