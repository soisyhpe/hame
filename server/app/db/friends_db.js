// dependencies
import { FRIENDS_COLLECTION } from '../db_connection.js';

async function getFriends(userId, limit=10) {
  let query = { user_id: userId };
  let projection = { _id: 0, friend_id: 1 };
  let results = await FRIENDS_COLLECTION.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function addFriend(userId, friendId, creationDate) {
  let newFriend = {
    user_id: userId,
    friend_id: friendId,
    creation_date: creationDate
  };
  let result = await FRIENDS_COLLECTION.insertOne(newFriend);

  return result;
}

async function deleteFriend(userId, friendId) {
  let query = { user_id: userId, friend_id: friendId };
  let result = await FRIENDS_COLLECTION.deleteOne(query);

  return result.deletedCount > 0;
}

export { getFriends, addFriend, deleteFriend };