// dependencies
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const authentication_tools = require('../tools/authentication_tools')
const {randomBytes}=require('crypto');

// mongodb's stuff
const uri = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const users = client.db("Hame").collection("users")



/**
 * Create a new user entry in the database (user and friend collection)
 * @param {string} email
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} birthDate
 * @param {string} userName
 * @param {string} password
 * @param {string} location
 * @param {string} bio
 * @param {string} website
 * @param {string} profilePicture
 * @returns {string|boolean} ID of the user if everything is valid, false otherwise
*/
async function createUser(email, firstName, lastName, birthDate, userName, password, location = "", bio = "", website = "", profilePicture = "") {
    // check every required fields
    if (email == "" || firstName == "" || lastName == "" || birthDate == "" || userName == "" || password == "") {
        return "email, firstName, lastName, birthDate, userName and password fields are required";
    }

    // check for email validity
    if (!authentication_tools.checkEmail(email)) {
        return "email not valid"
    }
    console.log("Success : email is valid")

    // check for firstName validity
    if (!authentication_tools.checkFirstName(firstName)) {
        return "firstName not valid"
    }
    console.log("Success : firstName is valid")

    // check for lastName validity
    if (!authentication_tools.checkLastName(lastName)) {
        return "lastName not valid"
    }
    console.log("Success : lastName is valid")

    // check for userName validity
    if (!authentication_tools.checkUserName(userName)) {
        return "userName not valid"
    }
    console.log("Success : userName is valid")

    // check for birthDate validity
    if (!authentication_tools.checkBirthDate(birthDate)) {
        return "birthDate not valid"
    }
    console.log("Success : birthDate is valid")

    // check for password validity
    if (!authentication_tools.checkPassword(password)) {
        return "password not valid"
    }
    console.log("Success : password is valid")

    // check user collection if user already exists
    if (await getUserByuserName(userName)) {
        return "User already exists";
    }
    console.log("Success : email is valid")

    // insert user in database
    const newUser = {
        "userid":randomBytes(16).toString("hex"),
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "birthDate": birthDate,
        "userName": userName,
        "password": await bcrypt.hash(password, 10),
        "location": location,
        "bio": bio,
        "website": website,
        "profilePicture": profilePicture,
        "followers":0,
        "followings":0,
        "creationDate": new Date().getTime()
    }

    const result = await users.insertOne(newUser);
    
    if (result.insertedCount === 0) {
        console.log("No documents inserted");
        return false;
    }
    console.log(`new user registered ${result.insertedId}`);
    return newUser.userid;
}

/**
 * Get a user with a specific userName
 * @param {string} userName
 * @returns {Object|boolean} user with the specific userName, false otherwise
*/
async function getUserByuserName(userName) {
    const query = { "userName": userName };
    const user = await users.findOne(query);
    if (user == null) {
        console.log("User does not exist");
        return false;
    }
    return user;
}

/**
 * Get a user with a specific id
 * @param {string} id
 * @returns {Object|boolean} user if successful, false otherwise
*/
async function getUserById(id) {
    const query = { "userid": id };
    const user = await users.findOne(query);
    return user;
}

/**
 * Delete a user with a specific userName
 * @param {string} userName
 * @returns {boolean} true if successful, false otherwise
*/
async function deleteUser(userName) {
    const query = { "userName": userName };
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
async function updateUser(userid,userName, name, lastName, email, password, birthDate="", location="", bio="", website="", profilePicture="") {
    if (userName == "" || name == "" || lastName == "" || email == "" || password == "") {
        console.log("Missing fields");
        return false;
    }
    if (!validateBirthday(birthDate)) {
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

    const query = { "userid": userid };
    const newValues = { $set: { "userName":userName,"name": name, "lastName": lastName, "email": email, "password": password, "birthDate": birthDate, "location": location, "bio": bio, "website": website, "profilePicture": profilePicture } };
    const result = await users.updateOne(query, newValues);
    if (result.modifiedCount === 0) {
        console.log("No documents matched the query. No documents were updated.");
        return false;
    }
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
    return true;
}


/**
 * Update a user's email
 * @param {string} userid
 * @param {string} email
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_email(userid,email){
    const query = { "userid": userid };
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
 * Update a user's userName
 * @param {string} userid
 * @param {string} newuserName
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_userName(userid,newuserName){

    if (newuserName===""){
        console.log("userName is empty");
        return false;
    }
    // check if userName exists
    const userExists = await getUserByuserName(newuserName);
    if (userExists) {
        console.log("userName already exists");
        return false;
    }
    const query = { "userid": userid };
    const newValues={ $set: { "userName": newuserName } };
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
 * @param {string} userid
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


    const query = { "userid": userid };
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
 * @param {string} userid
 * @param {string} newfirstName
 * @param {string} newlastName
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_name(userid,newfirstName,newlastName){
    if (newfirstName==="" || newlastName===""){
        console.log("firstName or lastName is empty");
        return false;
    }
    const query = { "userid": userid };
    const newValues={ $set: { "name": newfirstName, "lastName": newlastName } };
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
 * @param {string} userid
 * @param {string} newBio
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_bio(userid,newBio){
    if (newBio===""){
        console.log("Bio is empty");
        return false;
    }
    const query = { "userid": userid };
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
 * @param {string} userid
 * @param {string} profilePicture
 * @returns {boolean} true if successful, false otherwise
*/
async function updateUser_profilePicture(userid,profilePicture){
    if (profilePicture===""){
        console.log("Profile picture is empty");
        return false;
    }
    const query = { "userid": userid };
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
 * @param {string} userid
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
    
    const query = { "userid": userid };
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
 * @param {string} userid
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

    const query = { "userid": userid };
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

// specify which functions should be accessed from outside
module.exports = { createUser, deleteUser, listUsers }