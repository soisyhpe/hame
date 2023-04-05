const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


// create a new user in the database
async function createUser(name,lastname,username,email,password) {
    const user = {
        "name": name,
        "lastname": lastname,
        "username": username,
        "email": email,
        "password": password
    }
    // check user collection if user already exists
    const userExists = await getUserByUsername(username);

    users=client.db("test").collection("user");

    if (userExists) {
        // user already exists
        return;
    } else {
        // user does not exist, create new user
        const result = await users.insertOne(user);
    }

    console.log(`New user created with the following id: ${result.insertedId}`);
}

// get a user with a specific username
async function getUserByUsername(username) {
    users=client.db("test").collection("user");
    const query = { "username": username };
    const user = await users.findOne(query);
    return user;
}

// get a user with a specific ObjectId
async function getUserById(id) {
    users=client.db("test").collection("user");
    const query = { "_id": id };
    const user = await users.findOne(query);
    return user;
}

// delete an user with a specific username
async function deleteUser(username) {
    users=client.db("test").collection("user");
    const query = { "username": username };
    const result = await users.deleteOne(query);
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}


// return all users
async function listUsers() {
    users=client.db("test").collection("user");
    const cursor = users.find();
    return await cursor.toArray();
}


// regexp to check if email is valid
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}