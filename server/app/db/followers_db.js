// dependencies
const { DATABASE } = require('../db_connection');

// local stuff
const COLLECTION_NAME = "followers";

async function getFollowers(userId, limit=10) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId};
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function addFollower(userId, followerId, creationDate) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let newFollower = {
    user_id: userId,
    follower_id: followerId,
    creation_date: creationDate
  };
  let result = await collection.insertOne(newFollower);

  return result;
}

async function deleteFollower(userId, followerId) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId, follower_id: followerId};
  let result = await collection.deleteOne(query);

  return result.deletedCount > 0;
}

module.exports = { getFollowers, addFollower, deleteFollower };