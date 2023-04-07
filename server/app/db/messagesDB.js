const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const { randomBytes } =  require('crypto');


/**
 * get a message with a specific id
 * @param {ObjectId} id
 * @returns {Object} message with a specific id
 * @returns {Object | boolean} message if exists,false otherwise
*/
async function getMessageById(id) {
    messages=client.db("Hame").collection("message");
    const query = { "messageid": id };

    const message= await messages.findOne(query);
    if (message == null) {
        console.log("Message does not exist");
        return false;
    }
    return message;
}


/**
 * 
 * @param {string} username 
 * @returns {Array} array of messages from a specific user
 */
async function getMessagesFromUser(username) {
    messages=client.db("Hame").collection("message");
    const query = { "username": username };

    const messagesFromUser = await messages.find(query).toArray();
    return messagesFromUser;
}


/**
 * send a public message
 * @param {string} username
 * @param {string} message
 * @returns {string|boolean} Id of the message if successful, false otherwise
*/
async function sendPublicMessage(username, message) {
    const publicMessage = {
        "messageid": (new Date()).valueOf().toString('hex') + randomBytes(16).toString('hex'),
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
    console.log(`A document was inserted with the _id: ${publicMessage.messageid}`);
    return publicMessage.messageid;
}

/**
 * send a private message
 * @param {string} username
 * @param {string} message
 * @param {string} senderid
 * @param {string} receiverid
 * @returns {string|boolean} Id of the message if successful, false otherwise
*/
async function sendPrivateMessage(username, message, senderid,receiverid) {
    const privateMessage = {
        "messageid": (new Date()).valueOf().toString('hex') + randomBytes(16).toString('hex'),
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
    console.log(`A document was inserted with the _id: ${privateMessage.messageid}`);
    return privateMessage.messageid;
}

/**
 * delete a message with a specific id
 * @param {string} id
 * @returns {boolean} true if successful, false otherwise
*/
async function deleteMessageById(id) {
    messages=client.db("Hame").collection("message");
    const query = { "messageid": id };

    const result = await messages.deleteOne(query);
    if (result.deletedCount == 0) {
        console.log("Failed to delete message");
        return false;
    }
    console.log(`Deleted ${result.deletedCount} document(s)`);
    return true;
}


/**
 * like a message with a specific id
 * @param {string} usernameid
 * @param {string} messageid
 * @returns {boolean} true if successful, false otherwise
*/
async function likeMessageById(usernameid,messageid) {
    // need to update like count in message
    messages=client.db("Hame").collection("message");
    const query = { "messageid": messageid };
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


/**
 * unlike a message with a specific id
 * @param {string} usernameid
 * @param {string} messageid
 * @returns {boolean} true if successful, false otherwise
*/
async function unlikeMessageById(usernameid,messageid) {
    // need to update like count in message
    messages=client.db("Hame").collection("message");
    const query = { "messageid": messageid };
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


/**
 * retweet a message with a specific id
 * @param {string} usernameid
 * @param {string} messageid
 * @returns {boolean} true if successful, false otherwise
*/
async function retweetMessageById(usernameid,messageid) {
    // need to update retweet count in message
    messages=client.db("Hame").collection("message");
    const query = { "messageid": messageid };
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


/**
 * unretweet a message with a specific id
 * @param {string} usernameid
 * @param {string} messageid
 * @returns {boolean} true if successful, false otherwise
*/
async function unretweetMessageById(usernameid,messageid) {
    //  need to update retweet count in message
    messages=client.db("Hame").collection("message");
    const query = { "messageid": messageid };
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

/**
 * comment on a message with a specific id
 * @param {string} usernameid  - username of the user who is commenting
 * @param {string} messageid - id of the message being commented on
 * @param {string} comment - comment message
 * @returns {string} - id of the comment
*/
async function commentMessageById(usernameid,messageid,comment) {
    const commentMessage = {
        "messageid" : (new Date()).valueOf().toString('hex') + randomBytes(16).toString('hex'),
        "username": usernameid,
        "message": comment,
        "timestamp": new Date().getTime(),
        "likes": 0,
        "retweets": 0,
        "type": "comment",
        "comments": []
    }

    messages=client.db("Hame").collection("message");
    const result = await messages.insertOne(commentMessage);

    // update comments in message
    const query = { "messageid": messageid };
    newvalues= { $push: { "comments": commentMessage.messageid } };

    const result2=messages.updateOne(query, newvalues);
    if (result2.modifiedCount == 0) {
        console.log("Failed to comment message");
        return false;
    }

    console.log(`Comment with id : ${commentMessage.messageid} have been successfully inserted into message with id: ${messageid}`);

    return commentMessage.messageid;
}

    



