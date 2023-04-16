// dependencies
import { FOLLOWERS_COLLECTION } from '../db_connection.js';


async function getFollowers(userId, limit=10) {
  let query = {user_id: userId};
  let results = await FOLLOWERS_COLLECTION.find(query).limit(limit).toArray();

  return results;
}

async function addFollower(userId, followerId, creationDate) {
  let newFollower = {
    user_id: userId,
    follower_id: followerId,
    creation_date: creationDate
  };
  let result = await FOLLOWERS_COLLECTION.insertOne(newFollower);

  return result;
}

async function deleteFollower(userId, followerId) {
  let query = {user_id: userId, follower_id: followerId};
  let result = await FOLLOWERS_COLLECTION.deleteOne(query);

  return result.deletedCount > 0;
}

export { getFollowers, addFollower, deleteFollower };