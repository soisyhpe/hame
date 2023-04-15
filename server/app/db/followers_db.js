// dependencies
const { DATABASE } = require('../db_connection');

// local stuff
const COLLECTION_NAME = "followers";
DATABASE.collection(COLLECTION_NAME).createIndex({ user_id: 1 , follower_id : 1 }, { unique: true });


async function getFollowers(userId, limit=10) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId};
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function addFollower(userId, followerId, creationDate) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let newFollower = {
    user_id: userId,
    follower_id: followerId,
    creation_date: creationDate
  };
  let result = await collection.insertOne(newFollower);

  return result;
}

async function deleteFollower(userId, followerId) {
  let collection = DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId, follower_id: followerId};
  let result = await collection.deleteOne(query);

  return result.deletedCount > 0;
}

module.exports = { getFollowers, addFollower, deleteFollower };