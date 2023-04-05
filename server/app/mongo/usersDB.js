const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



// create a new user in the database and return ObjectId
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

    if (userExists) {
        console.log("User already exists");
        return;
    }

    // check if email is valid
    if (!validateEmail(email)) {
        console.log("Email is not valid");
        return;
    }

    // insert user in database
    users=client.db("Hame").collection("user");
    const result = await users.insertOne(user);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return result.insertedId;
}



// get a user with a specific username
async function getUserByUsername(username) {
    users=client.db("Hame").collection("user");
    const query = { "username": username };
    const user = await users.findOne(query);
    return user;
}

// get a user with a specific ObjectId
async function getUserById(id) {
    users=client.db("Hame").collection("user");
    const query = { "_id": id };
    const user = await users.findOne(query);
    return user;
}

// delete an user with a specific username
async function deleteUser(username) {
    users=client.db("Hame").collection("user");
    const query = { "username": username };
    const result = await users.deleteOne(query);
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}


// return all users
async function listUsers() {
    users=client.db("Hame").collection("user");
    const cursor = users.find();
    return await cursor.toArray();
}


// regexp to check if email is valid
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}




async function main(){
    const id=await createUser("Norras","Sarron","APAo","test123@gmail.com","123456")
    // ObjectId to string
    if (!id) return;
    const idString=id.toString();
    console.log(idString);
}

main().catch(console.error)