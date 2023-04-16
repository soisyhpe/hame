// dependencies
import { CIRCLES_COLLECTION } from '../db_connection.js';

async function getCircles(userId, limit=10) {
  let query = {user_id: userId};
  let projection = {_id: 0, circle_id: 1};
  let results = await CIRCLES_COLLECTION.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function addCircle(userId, circleId, addedDate) {
  let newCircle = {
    user_id: userId,
    circle_id: circleId,
    added_date: addedDate
  };
  let result = await CIRCLES_COLLECTION.insertOne(newCircle);

  return result;
}

async function deleteCircle(userId, circleId) {
  let query = {user_id: userId, circle_id: circleId};
  let result = await CIRCLES_COLLECTION.deleteOne(query);

  return result.deletedCount > 0;
}

export { getCircles, addCircle, deleteCircle };