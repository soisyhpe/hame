const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const bcrypt = require('bcrypt');

/**
 * Create a new user entry in the database (user and friend collection)
 * @param {string} email
 * @param {string} name
 * @param {string} lastname
 * @param {string} username
 * @param {string} password
 * @param {string} birthdate
 * @param {string} location
 * @param {string} bio
 * @param {string} website
 * @param {string} profilePicture
 * @returns {ObjectId|boolean} ObjectId of the user if everything is valid, false otherwise
*/
async function createUser(email, name, lastname, username, password, birthdate="", location="", bio="", website="", profilePicture="") {
    if (email == "" || name == "" || lastname == "" || username == "" || password == "") {
        console.log("Missing information");
        return false;
    }

    if (!validatePassword(password)) {
        console.log("Password is not valid");
        return false;
    }

    // hash password
    password=await bcrypt.hash(password, 10);


   
    const user = {
        "name": name, 
        "lastname": lastname,
        "username": username,
        "email": email,
        "password": password,
        "birthdate": birthdate,
        "location": location,
        "creationDate": new Date().getTime(),
        "bio": bio,
        "website": website,
        "profilePicture": profilePicture,
        "likedMessages": [],
        "retweetedMessages": [],
        "followedUsers": [],
        "followers": []
    }
    // check user collection if user already exists
    const userExists = await getUserByUsername(username);

    if (userExists) {
        console.log("User already exists");
        return false;
    }

    // check if email is valid
    if (!validateEmail(email)) {
        console.log("Email is not valid");
        return false;
    }



    // insert user in database
    users=client.db("Hame").collection("user");

    const result = await users.insertOne(user);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    const userfriend= {
        "username": username,
        "userid": result.insertedId,
        "friends": []
    }

    friends=client.db("Hame").collection("friends");
    const result2 = await friends.insertOne(userfriend);


    return result.insertedId;
}



/**
 * Get a user with a specific username
 * @param {string} username
 * @returns {Object|boolean} user with the specific username, false otherwise
*/
async function getUserByUsername(username) {
    users=client.db("Hame").collection("user");
    const query = { "username": username };
    const user = await users.findOne(query);
    if (user == null) {
        console.log("User does not exist");
        return false;
    }
    return user;
}

/**
 * Get a user with a specific id
 * @param {ObjectId} id
 * @returns {Object|boolean} user if successful, false otherwise
*/
async function getUserById(id) {
    users=client.db("Hame").collection("user");
    const query = { "_id": id };
    const user = await users.findOne(query);
    return user;
}

/**
 * Delete a user with a specific username
 * @param {string} username
 * @returns {boolean} true if successful, false otherwise
*/
async function deleteUser(username) {
    users=client.db("Hame").collection("user");
    const query = { "username": username };
    const result = await users.deleteOne(query);
    if (result.deletedCount === 0) {
        console.log("No documents matched the query. No documents were deleted.");
        return false;
    }
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    return true;
}


/**
 * Get all users
 * @returns {Array} array of users
*/
async function listUsers() {
    users=client.db("Hame").collection("user");
    const cursor = users.find();
    return await cursor.toArray();
}


/**
 * Check if email is valid
 * @param {string} email
 * @returns {boolean} true if valid, false otherwise
*/
 function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

/**
 * Check if birthday is valid
 * @param {string} birthday
 * @returns {boolean} true if valid, false otherwise
 * @example
 * validateBirthday("1999-12-31"); // returns true
 * validateBirthday("1999-12-32"); // returns false
*/
function validateBirthday(birthday) {
    // this regex checks if birthday is in the format YYYY-MM-DD
    const re = /^\d{4}-\d{2}-\d{2}$/;
    return re.test(birthday);
}

/**
 * Check if password is valid
 * @param {string} password
 * @returns {boolean} true if valid, false otherwise
 * @example
 * validatePassword("Password1"); // returns true
 * validatePassword("password1"); // returns false
*/
function validatePassword(password){
    // this regex checks if password is between 6 and 20 characters long
    // and contains at least one digit, one lowercase and one uppercase letter
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(password);
}

/**
 * Check if website is valid
 * @param {string} location
 * @returns {boolean} true if valid, false otherwise
 * @example
 * validateWebsite("http://www.example.com"); // returns true
 * validateWebsite("example.com"); // returns false
 * validateWebsite("www.example.com"); // returns false
*/
function validateWebsite(website){
    // this regex checks if website is in the format http://www.example.com
    const re = /^(http|https):\/\/(www\.)?[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    return re.test(website);
}

/**
 * Update a user
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser(userid,username, name, lastname, email, password, birthdate="", location="", bio="", website="", profilePicture="") {
    if (username == "" || name == "" || lastname == "" || email == "" || password == "") {
        console.log("Missing fields");
        return false;
    }
    if (!validateBirthday(birthdate)) {
        console.log("Birthday is not valid");
        return false;
    }
    if (!validatePassword(password)) {
        console.log("Password is not valid");
        return false;
    }
    if (!validateWebsite(website)) {
        console.log("Website is not valid");
        return false;
    }
    if (!validateEmail(email)) {
        console.log("Email is not valid");
        return false;
    }

    users=client.db("Hame").collection("user");
    const query = { "_id": userid };
    const newValues = { $set: { "username":username,"name": name, "lastname": lastname, "email": email, "password": password, "birthdate": birthdate, "location": location, "bio": bio, "website": website, "profilePicture": profilePicture } };
    const result = await users.updateOne(query, newValues);
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}


/**
 * Update a user's email
 * @param {ObjectId} userid
 * @param {string} email
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_email(userid,email){
    users=client.db("Hame").collection("user");
    const query = { "_id": userid };
    const newValues = { $set: { "email": email } };
    const result = await users.updateOne(query, newValues);
    if (result.modifiedCount === 0) {
        console.log("No documents matched the query. No documents were updated.");
        return false;
    } else {
        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        return true;
    }
}

/**
 * Update a user's username
 * @param {ObjectId} userid
 * @param {string} newUsername
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_username(userid,newUsername){

    if (newUsername===""){
        console.log("Username is empty");
        return false;
    }
    users=client.db("Hame").collection("user");
    // check if username exists
    const userExists = await getUserByUsername(newUsername);
    if (userExists) {
        console.log("Username already exists");
        return false;
    }
    const query = { "_id": userid };
    const newValues={ $set: { "username": newUsername } };
    const result = await users.updateOne(query, newValues);
    if (result.modifiedCount === 0) {
        console.log("Any user matched the query. No user were updated.");
        return false;
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        return true;
    }
}

/**
 * Update a user's password
 * @param {ObjectId} userid
 * @param {string} password
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_password(userid,password){
    if (password===""){
        console.log("Password is empty");
        return false;
    }
    // check if password is valid
    if (!validatePassword(password)) {
        console.log("Password is not valid");
        return false;
    }

    // hash password
    password = await bcrypt.hash(password, 10);


    users=client.db("Hame").collection("user");
    const query = { "_id": userid };
    const newValues={ $set: { "password": password } };
    const result = await users.updateOne(query, newValues);
    if (result.modifiedCount === 0) {
        console.log("Any user matched the query. No user were updated.");
        return false;
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        return true;
    }
}



/**
 * Update a user's first name and last name
 * @param {ObjectId} userid
 * @param {string} newFirstname
 * @param {string} newLastname
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_name(userid,newFirstname,newLastname){
    if (newFirstname==="" || newLastname===""){
        console.log("Firstname or lastname is empty");
        return false;
    }
    users=client.db("Hame").collection("user");
    const query = { "_id": userid };
    const newValues={ $set: { "name": newFirstname, "lastname": newLastname } };
    const result = await users.updateOne(query, newValues);
    if (result.modifiedCount === 0) {
        console.log("Any user matched the query. No user were updated.");
        return false;
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        return true;
    }
}

/**
 * Update a user's bio
 * @param {ObjectId} userid
 * @param {string} newBio
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_bio(userid,newBio){
    if (newBio===""){
        console.log("Bio is empty");
        return false;
    }
    users=client.db("Hame").collection("user");
    const query = { "_id": userid };
    const newValues={ $set: { "bio": newBio } };
    const result = await users.updateOne(query, newValues);
    if (result.modifiedCount === 0) {
        console.log("Any user matched the query. No user were updated.");
        return false;
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        return true;
    }
}

/**
 * Update a user's profile picture
 * @param {ObjectId} userid
 * @param {string} profilePicture
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_profilePicture(userid,profilePicture){
    if (profilePicture===""){
        console.log("Profile picture is empty");
        return false;
    }
    users=client.db("Hame").collection("user");
    const query = { "_id": userid };
    const newValues={ $set: { "profilePicture": profilePicture } };
    const result = await users.updateOne(query, newValues);
    if (result.modifiedCount === 0) {
        console.log("Any user matched the query. No user were updated.");
        return false;
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        return true;
    }
}


/**
 * Update a user's birthday
 * @param {ObjectId} userid
 * @param {string} birthday
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_birthday(userid,birthday){
    if (birthday===""){
        console.log("Birthday is empty");
        return false;
    }

    if (!validateBirthday(birthday)) {
        console.log("Birthday is not valid");
        return false;
    }
    
    users=client.db("Hame").collection("user");
    const query = { "_id": userid };
    const newValues={ $set: { "birthday": birthday } };
    const result = await users.updateOne(query, newValues);
    if (result.modifiedCount === 0) {
        console.log("Any user matched the query. No user were updated.");
        return false;
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        return true;
    }
}





/**
 * Update a user's website
 * @param {ObjectId} userid
 * @param {string} website
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_website(userid,website){
    if (website===""){
        console.log("Website is empty");
        return false;
    }
    if (!validateWebsite(website)) {
        console.log("Website is not valid");
        return false;
    }

    users=client.db("Hame").collection("user");
    const query = { "_id": userid };
    const newValues={ $set: { "website": website } };
    const result = await users.updateOne(query, newValues);
    if (result.modifiedCount === 0) {
        console.log("Any user matched the query. No user were updated.");
        return false;
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        return true;
    }
}






/* 
async function main() {
    const id=await createUser("Norras","Sarron","APAo","test123@gmail.com","123456")
    // ObjectId to string
    if (!id) return;
    const idString=id.toString();
    console.log(idString);
} */

//main().catch(console.error)

module.exports = { createUser, deleteUser, listUsers }