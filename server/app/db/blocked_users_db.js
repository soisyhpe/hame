// dependencies
import BLOCKED_USERS_COLLECTION from "../db_connection.js";

async function getBlockedUsers(userId, limit=10) {
  let query = {user_id: userId};
  let projection = {_id: 0, blocked_user_id: 1};
  let results = await BLOCKED_USERS_COLLECTION.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function blockUser(userId, blockedUserId, blockedDate) {
  let newBlockedUser = {
    user_id: userId,
    blocked_user_id: blockedUserId,
    blocked_date: blockedDate
  };
  let result = await BLOCKED_USERS_COLLECTION.insertOne(newBlockedUser);

  return result;
}

async function unblockUser(userId, blockedUserId) {
  let query = {user_id: userId, blocked_user_id: blockedUserId};
  let result = await BLOCKED_USERS_COLLECTION.deleteOne(query);

  return result.deletedCount > 0;
}

export { getBlockedUsers, blockUser, unblockUser };