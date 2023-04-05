const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// get a message with a specific id
async function getMessageById(id) {
    messages=client.db("Hame").collection("message");
    const query = { "_id": id };

    const message= await messages.findOne(query);
    return message;
}

// get all messages from a specific user
async function getMessagesFromUser(username) {
    messages=client.db("Hame").collection("message");
    const query = { "username": username };

    const messagesFromUser = await messages.find(query).toArray();
    return messagesFromUser;
}

// send a public message 
async function sendPublicMessage(username, message) {
    const publicMessage = {
        "username": username,
        "message": message,
        "likes": 0,
        "timestamp": new Date().getTime(),
        "type": "public"
    }

    messages=client.db("Hame").collection("message");
    const result = await messages.insertOne(publicMessage);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return result.insertedId;
}

// send a private message
async function sendPrivateMessage(username, message, senderid,receiverid) {
    const privateMessage = {
        "username": username,
        "message": message,
        "timestamp": new Date().getTime(),
        "type": "private",
        "senderid": senderid,
        "receiverid": receiverid
    }

    messages=client.db("Hame").collection("message");
    const result = await messages.insertOne(privateMessage);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return result.insertedId;
}


