// dependencies
const { DATABASE } = require('../db_connection');

// local stuff
const COLLECTION_NAME = "circles";

async function getCircles(userId, limit=10) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId};
  let results = await collection.find(query).limit(limit).toArray();

  return results;
}

async function addCircle(userId, circleId, addedDate) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let newCircle = {
    user_id: userId,
    circle_id: circleId,
    added_date: addedDate
  };
  let result = await collection.insertOne(newCircle);

  return result;
}

async function deleteCircle(userId, circleId) {
  let collection = await DATABASE.collection(COLLECTION_NAME);
  let query = {user_id: userId, circle_id: circleId};
  let result = await collection.deleteOne(query);

  return result.deletedCount > 0;
}

module.exports = { getCircles, addCircle, deleteCircle };