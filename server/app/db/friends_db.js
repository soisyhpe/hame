// dependencies
const { DATABASE } = require('../db_connection');

// local stuff
const COLLECTION_NAME = "friends";

async function getFriends(userId, limit=10) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId};
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function addFriend(userId, friendId, creationDate) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let newFriend = {
    user_id: userId,
    friend_id: friendId,
    creation_date: creationDate
  };
  let result = await collection.insertOne(newFriend);

  return result;
}

async function deleteFriend(userId, friendId) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId, friend_id: friendId};
  let result = await collection.deleteOne(query);

  return result.deletedCount > 0;
}

module.exports = { getFriends, addFriend, deleteFriend };