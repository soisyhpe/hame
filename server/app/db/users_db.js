// dependencies
const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');
const authentication_tools = require('../tools/authentication_tools')
const { DATABASE } = require('../db_connection');
const { setDefaultResultOrder } = require('dns');

// local stuff
const COLLECTION_NAME = 'users';

async function getUsers(limit=10) {
    let collection = await DATABASE.collection(COLLECTION_NAME);
    let query = {};
    let result = await collection.find(query).limit(limit).toArray();
    
    return result;
}

async function getUserFromUsername(username) {
    let collection = await DATABASE.collection(COLLECTION_NAME);
    let query = { username: username };
    let result = await collection.findOne(query);
    
    return result;
}

async function getUserFromId(userId) {
    let collection = await DATABASE.collection(COLLECTION_NAME);
    let query = { user_id: userId };
    let result = await collection.findOne(query);
    
    return result;
}

async function createUser(email, firstName, lastName, birthDate, userName, password, location, bio, website, profilePicture, profileBanner, creationDate) {
    let collection = await DATABASE.collection(COLLECTION_NAME);
    let newUser = {
        "user_id": randomUUID(),
        "email": email,
        "firstname": firstName,
        "lastname": lastName,
        "birthdate": birthDate,
        "username": userName,
        "password": await bcrypt.hash(password, 10),
        "location": location,
        "bio": bio,
        "website": website,
        "profile_picture": profilePicture,
        "profile_banner": profileBanner,
        "friends": 0,
        "followers": 0,
        "creation_date": creationDate
    }
    let result = await collection.insertOne(newUser);
    
    return result;
}

async function deleteUser(userId) {
    let collection = await DATABASE.collection(COLLECTION_NAME);
    let query = { user_id: userId };
    let result = await collection.deleteOne(query);

    return result;
}

// todo : update user

// specify which functions should be accessed from outside
module.exports = { getUsers, getUserFromUsername, getUserFromId, createUser, deleteUser }