// dependencies
const { DATABASE } = require('../db_connection');

// local stuff
const COLLECTION_NAME = "blocked_users";
DATABASE.collection(COLLECTION_NAME).createIndex({ user_id: 1 , blocked_user_id : 1 }, { unique: true });

async function getBlockedUsers(userId, limit=10) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId};
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function blockUser(userId, blockedUserId, blockedDate) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let newBlockedUser = {
    user_id: userId,
    blocked_user_id: blockedUserId,
    blocked_date: blockedDate
  };
  let result = await collection.insertOne(newBlockedUser);

  return result;
}

async function unblockUser(userId, blockedUserId) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId, blocked_user_id: blockedUserId};
  let result = await collection.deleteOne(query);

  return result.deletedCount > 0;
}

module.exports = { getBlockedUsers, blockUser, unblockUser };