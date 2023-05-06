// dependencies
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { USERS_COLLECTION } from '../db_connection.js';
import { setDefaultResultOrder } from 'dns';

async function getUsers(limit=10) {
    let query = {};
    let result = await USERS_COLLECTION.find(query).limit(limit).toArray()
        .catch(err => console.error(`Unable to found users (${err})`));
    
    return result;
}

async function isUser(username, password) {
    let query = { username: username, password: await hash(password, 10) };
    await USERS_COLLECTION.findOne(query)
        .then(result => {
            if (result) return true;
            else return false;
        })
        .catch(err => console.error(`Unable to find user (${err})`));
}

async function getUserFromEmail(email) {
    let query = { email: email };
    let result = await USERS_COLLECTION.findOne(query)
        .catch(err => console.error(`Unable to find user (${err})`));
    
    return result;
}

async function getUserFromUsername(username) {
    let query = { username: username };
    let result = await USERS_COLLECTION.findOne(query)
        .catch(err => console.error(`Unable to find user (${err})`));
    
    return result;
}

async function getUserFromId(userId) {
    let query = { user_id: userId };
    let result = await USERS_COLLECTION.findOne(query)
        .catch(err => console.error(`Unable to find user (${err})`));
    
    return result;
}

async function createUser(email, firstName, lastName, birthDate, userName, password, location, bio, website, profilePicture, profileBanner, creationDate) {
    let newUser = {
        "user_id": randomUUID(),
        "email": email,
        "firstname": firstName,
        "lastname": lastName,
        "birthdate": birthDate,
        "username": userName,
        "password": await hash(password, 10),
        "location": location,
        "bio": bio,
        "website": website,
        "profile_picture": profilePicture,
        "profile_banner": profileBanner,
        "friends": 0,
        "followers": 0,
        "creation_date": creationDate
    }
    let result = await USERS_COLLECTION.insertOne(newUser)
        .catch(err => console.error(`Unable to create new user (${err})`));
    
    return result;
}

async function deleteUser(userId) {
    let query = { user_id: userId };
    let result = await USERS_COLLECTION.deleteOne(query)
        .catch(err => console.error(`Unable to delete user (${err})`));

    return result.deletedCount > 0;
}

// todo : update user 

// specify which functions should be accessed from outside
export { getUsers, isUser, getUserFromEmail, getUserFromUsername, getUserFromId, createUser, deleteUser }