// dependencies
import { SESSIONS_COLLECTION } from '../db_connection.js';

async function getSessions(limit=10) {
  let query = {};
  let projection = { _id: 0, session_id: 1 };
  let results = await SESSIONS_COLLECTION.find(query).project(projection).limit(limit).toArray();

  return results;
}

async function login(userId, sessionId, creationDate) {
  let newSession = {
    user_id: userId,
    session_id: sessionId,
    creation_date: creationDate
  };
  let result = await SESSIONS_COLLECTION.insertOne(newSession);

  return result;
}

async function logout(userId) {
  let query = { user_id: userId };
  let result = await SESSIONS_COLLECTION.deleteOne(query);

  return result.deletedCount > 0;
}

export { getSessions, login, logout };