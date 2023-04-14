// dependencies
const { DATABASE } = require('../db_connection');

// local stuff
const COLLECTION_NAME = "blocked_users";

async function getBlockedUsers(userId, limit=10) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId};
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function blockUser(userId, blockedUserId, blockedDate) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let newBlockedUser = {
    user_id: userId,
    blocked_user_id: blockedUserId,
    blocked_date: blockedDate
  };
  let result = await collection.insertOne(newBlockedUser);

  return result;
}

async function unblockUser(userId, blockedUserId) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId, blocked_user_id: blockedUserId};
  let result = await collection.drop(query);

  return result;
}

module.exports = { getBlockedUsers, blockUser, unblockUser };