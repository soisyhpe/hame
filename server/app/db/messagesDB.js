const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const { randomBytes } =  require('crypto');
const messages=client.db("Hame").collection("message");
const likedMessages=client.db("Hame").collection("likedMessage");
const retweetedMessages=client.db("Hame").collection("retweetedMessage");
const users=client.db("Hame").collection("user");



async function getAllMessages(){
    const result = await messages.find({}).toArray();
    return result;
}

/**
 * get a message with a specific id
 * @param {string} id
 * @returns {string} message with a specific id
 * @returns {Object | boolean} message if exists,false otherwise
*/
async function getMessageById(id) {
    
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
    console.log(username);
    console.log(message);
    if (username === undefined || message === undefined || username === null || message === null || username === "" || message === "") {
        console.log("Username or message is null");
        return false;
    }

    const publicMessage = {
        "messageid": (new Date()).valueOf().toString() + randomBytes(16).toString('hex'),
        "username": username,
        "message": message,
        "likes": 0,
        "retweets": 0,
        "comments": [],
        "timestamp": new Date().getTime(),
        "type": "public"
    }

    const result = await messages.insertOne(publicMessage);


    // if failed to send message
    if (result == null) {
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


    const result = await messages.insertOne(privateMessage);
    // if failed to send message
    if (result == null) {
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

    const query = { "messageid": id };

    const result = messages.deleteOne(query);
    if ((await result).deletedCount === 0) {
        console.log("Failed to delete message");
        return false;
    }
    console.log(`Deleted ${(await result).deletedCount} document(s)`);
    return true;
}


/**
 * like a message with a specific id
 * @param {string} usernameid
 * @param {string} messageid
 * @returns {boolean} true if successful, false otherwise
*/
async function likeMessageById(usernameid,messageid) {

    if (likedMessages.findOne({"messageid":messageid,"userid":usernameid})!==null){
        console.log(`${usernameid} already liked ${messageid}`);
        return false;
    }
    // need to update like count in message

    const result = await messages.updateOne({ "messageid": messageid }, { $inc: { "likes": 1 } });
    
    if (result.modifiedCount == 0) {
        console.log("Failed to like message");
        return false;
    }

    // need to set a liked message entry 

    const result2=await likedMessages.insertOne({"messageid": messageid,"userid" : usernameid});
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

    if (likedMessages.findOne({"messageid":messageid,"userid":usernameid})===null){
        console.log(`${usernameid} didn't liked ${messageid}`);
        return false;
    }
    // need to update like count in message
    

    const result=messages.updateOne({ "messageid": messageid }, { $inc: { "likes": -1 } });
    if (result.modifiedCount == 0) {
        console.log("Failed to unlike message");
        return false;
    }

    // need to update liked messages in user
    
    const result2=likedMessages.deleteOne({"messageid" : messageid ,"userid": usernameid});
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

    if (retweetedMessages.findOne({"messageid":messageid,"userid":usernameid})!==null){
        console.log(`${usernameid} already retweeted ${messageid}`);
        return false;
    }
    // need to update retweet count in message
    


    const result1=messages.updateOne({ "messageid": messageid },  { $inc: { "retweets": 1 } });
    if (result1.modifiedCount == 0) {
        console.log("Failed to retweet message");
        return false;
    }

    // need to update retweeted messages in user
    

    const result2= await retweetedMessages.insertOne({"messageid" : messageid , "userid" : usernameid});


    console.log(`${result2.deletedCount} documents deleted`);
    return true;
}


/**
 * unretweet a message with a specific id
 * @param {string} usernameid
 * @param {string} messageid
 * @returns {boolean} true if successful, false otherwise
*/
async function unretweetMessageById(usernameid,messageid) {
    if (retweetedMessages.findOne({"messageid":messageid,"userid":usernameid})===null){
        console.log(`${usernameid} didn't retweeted ${messageid}`);
        return false;
    }
    //  need to update retweet count in message
    

    const result1=messages.updateOne({ "messageid": messageid }, { $inc: { "retweets": -1 } });

    if (result1.modifiedCount == 0) {
        console.log("Failed to unretweet message");
        return false;
    }

    // need to update retweeted messages in user
    
    const result2 = retweetedMessages.deleteOne({"messageid":messageid,"userid":usernameid});

    console.log(`${result2.deletedCount} documents deleted`);

    return true;
}


/**
 * Get list of users who liked the message with the specified ID
 * @param {string} messageid 
 * @returns List of user's ID
 */
async function getLikingUsers(messageid){
    const list=likedMessages.find({"messageid" : messageid},{projection:{"userid" : 1}}).toArray();
    return list;
}


/**
 * Get list of users who retweeted the message with the specified ID
 * @param {string} messageid 
 * @returns List of user's ID
 */
async function getRetweetingUsers(messageid){
    const list = likedMessages.find({"messageid" : messageid }, {projection : {"userid" : 1}}).toArray();

    return list;
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


async function modifyMessage(messageid, newMessage) {
    if (messageid === null || newMessage === null || messageid === undefined || newMessage === undefined || messageid === "" || newMessage === "") {
        console.log("Invalid messageid or newMessage");
        return false;
    }
    const query = { "messageid": messageid };
    newvalues = { $set: { "message": newMessage } };

    const result = await messages.updateOne(query, newvalues);

    if (result.modifiedCount == 0) {
        console.log("Failed to modify message");
        return false;
    }

    console.log(`Updated ${result.modifiedCount} document(s)`);
    return true;
}




module.exports={getAllMessages , getMessageById , getMessageById , sendPrivateMessage , sendPublicMessage , getMessagesFromUser , deleteMessageById , likeMessageById , unlikeMessageById , retweetMessageById , unretweetMessageById , getLikingUsers , getRetweetingUsers , commentMessageById , modifyMessage};



