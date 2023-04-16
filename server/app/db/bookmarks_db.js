// dependencies
import { randomUUID } from 'crypto';
import { BOOKMARKS_COLLECTION } from '../db_connection.js';

async function getBookmarks(userId, limit=10) {
  let query = {user_id: userId};
  let results = await BOOKMARKS_COLLECTION.find(query).limit(limit).toArray();

  return results;
}

async function addBookmark(userId, messageId, creationDate) {
  let newBookmark = {
    user_id: userId,
    message_id: messageId,
    bookmark_id: randomUUID(),
    creation_date: creationDate
  };
  let result = await BOOKMARKS_COLLECTION.insertOne(newBookmark);

  return result;
}

async function deleteBookmark(userId, bookmarkId) {
  let query = {user_id: userId, bookmark_id: bookmarkId};
  let result = await BOOKMARKS_COLLECTION.deleteOne(query);

  return result.deletedCount > 0;
}

export { getBookmarks, addBookmark, deleteBookmark };