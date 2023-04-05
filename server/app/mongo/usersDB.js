const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



// create a new user in the database and return ObjectId
export async function createUser(email, name, lastname, username, password, birthdate="", location="", bio="", website="", profilePicture="") {
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
        "profilePicture": profilePicture
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
    return result.insertedId;
}



// get a user with a specific username
export async function getUserByUsername(username) {
    users=client.db("Hame").collection("user");
    const query = { "username": username };
    const user = await users.findOne(query);
    return user;
}

// get a user with a specific ObjectId
export async function getUserById(id) {
    users=client.db("Hame").collection("user");
    const query = { "_id": id };
    const user = await users.findOne(query);
    return user;
}

// delete an user with a specific username
export async function deleteUser(username) {
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


// return all users
export async function listUsers() {
    users=client.db("Hame").collection("user");
    const cursor = users.find();
    return await cursor.toArray();
}


// regexp to check if email is valid
export function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// update user
export async function updateUser(username, name, lastname, email, password, birthdate="", location="", bio="", website="", profilePicture="") {
    users=client.db("Hame").collection("user");
    const query = { "username": username };
    const newValues = { $set: { "name": name, "lastname": lastname, "email": email, "password": password, "birthdate": birthdate, "location": location, "bio": bio, "website": website, "profilePicture": profilePicture } };
    const result = await users.updateOne(query, newValues);
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

export async function main() {
    const id=await createUser("Norras","Sarron","APAo","test123@gmail.com","123456")
    // ObjectId to string
    if (!id) return;
    const idString=id.toString();
    console.log(idString);
}

main().catch(console.error)