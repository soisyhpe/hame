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
        "retweets": 0,
        "comments": [],
        "timestamp": new Date().getTime(),
        "type": "public"
    }

    messages=client.db("Hame").collection("message");
    const result = await messages.insertOne(publicMessage);


    // if failed to send message
    if (result.insertedId == null) {
        console.log("Failed to send message");
        return false;
    }
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return result.insertedId;
}

// send a private message
async function sendPrivateMessage(username, message, senderid,receiverid) {
    const privateMessage = {
        "username": username,
        "message": message,
        "senderid": senderid,
        "receiverid": receiverid,
        "timestamp": new Date().getTime(),
        "type": "private"
    }

    messages=client.db("Hame").collection("message");
    const result = await messages.insertOne(privateMessage);
    // if failed to send message
    if (result.insertedId == null) {
        console.log("Failed to send message");
        return false;
    }
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return result.insertedId;
}

// delete a message with a specific id
async function deleteMessageById(id) {
    messages=client.db("Hame").collection("message");
    const query = { "_id": id };

    const result = await messages.deleteOne(query);
    if (result.deletedCount == 0) {
        console.log("Failed to delete message");
        return false;
    }
    console.log(`Deleted ${result.deletedCount} document(s)`);
    return true;
}

// like a message with a specific id
async function likeMessageById(usernameid,messageid) {
    // need to update like count in message
    messages=client.db("Hame").collection("message");
    const query = { "_id": messageid };
    newvalues= { $inc: { "likes": 1 } };

    const result = messages.updateOne(query, newvalues);
    
    if (result.modifiedCount == 0) {
        console.log("Failed to like message");
        return false;
    }

    // need to update liked messages in user
    users=client.db("Hame").collection("user");
    const query2 = { "username": usernameid };
    newvalues= { $push: { "likedMessages": messageid } };
    const result2= users.updateOne(query2, newvalues);

    console.log(`Updated ${result.modifiedCount} document(s)`);
    return true;
}

// unlike a message with a specific id
async function unlikeMessageById(usernameid,messageid) {
    // need to update like count in message
    messages=client.db("Hame").collection("message");
    const query = { "_id": messageid };
    newvalues= { $inc: { "likes": -1 } };

    const result=messages.updateOne(query, newvalues);
    if (result.modifiedCount == 0) {
        console.log("Failed to unlike message");
        return false;
    }

    // need to update liked messages in user
    users=client.db("Hame").collection("user");
    const query2 = { "username": usernameid };
    newvalues= { $pull: { "likedMessages": messageid } };

    const result2=users.updateOne(query2, newvalues);
    console.log(`Updated ${result.modifiedCount} document(s)`);

    return true;
}


// retweet a message with a specific id
async function retweetMessageById(usernameid,messageid) {
    // need to update retweet count in message
    messages=client.db("Hame").collection("message");
    const query = { "_id": messageid };
    newvalues= { $inc: { "retweets": 1 } };

    const result1=messages.updateOne(query, newvalues);
    if (result1.modifiedCount == 0) {
        console.log("Failed to retweet message");
        return false;
    }

    // need to update retweeted messages in user
    users=client.db("Hame").collection("user");
    const query2 = { "username": usernameid };
    newvalues= { $push: { "retweetedMessages": messageid } };

    const result2=users.updateOne(query2, newvalues);
    console.log(`Updated ${result1.modifiedCount} document(s)`);
    return true;
}


// unretweet a message with a specific id
async function unretweetMessageById(usernameid,messageid) {
    //  need to update retweet count in message
    messages=client.db("Hame").collection("message");
    const query = { "_id": messageid };
    newvalues= { $inc: { "retweets": -1 } };

    const result1=messages.updateOne(query, newvalues);

    if (result1.modifiedCount == 0) {
        console.log("Failed to unretweet message");
        return false;
    }

    // need to update retweeted messages in user
    users=client.db("Hame").collection("user");
    const query2 = { "username": usernameid };
    newvalues= { $pull: { "retweetedMessages": messageid } };

    const result2=users.updateOne(query2, newvalues);
    console.log(`Updated ${result1.modifiedCount} document(s)`);
    return true;
}

    



