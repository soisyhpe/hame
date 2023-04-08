const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const followings=client.db("Hame").collection("following");
const users=client.db("Hame").collection("user");


/*follower entry example
{
    "followerid": "Norras",
    "is_following": "Sarroan",
    "follower_since" : 1620000000000
}
*/


/**
 * @param {string} userid 
 * @returns {Array} User's list of followers
 */
async function getFollowers(userid) {
    const query = { "isfollowing": userid };
    const list = await followings.find(query,{projection:{"followerid":1}}).toArray();
    return list;
}


/**
 * @param {string} userid 
 * @returns {Array} User's following list 
 */
async function getFollowings(userid){
    const query = { "followerid": userid };
    const list = await followings.find(query,{projection:{"is_following":1}}).toArray();
    return list;
}





/**
 * @param {string} followerid
 * @param {string} followedid
 * @returns {boolean} true if successful, false otherwise
*/
async function follow(followerid,followedid){


    if (followerid === followedid) {
        console.log("You cannot follow yourself");
        return false;
    }
    if (followerid === null || followedid === null) {
        console.log("You cannot follow a null user");
        return false;
    }
    if (users.findOne({ "username": followerid }) === null || users.findOne({ "username": followedid }) === null) {
        console.log("You cannot follow a non-existing user");
        return false;
    }

    const follower_entry={
        "followerid":followerid,
        "is_following":followedid,
        "follower_since" : new Date().getTime()
    }
    const result = await followings.insertOne(follower_entry);


    return true;
}


/**
 * Are they following each other ?
 * @param {string} userid1 
 * @param {string} userid2
 * @returns {boolean} True if yes,False if not
 */
async function are_following_eo(userid1,userid2){

    var result=await followings.findOne({"follower" : userid1, "is_following" : userid2});

    if (result===null){
        console.log(`${userid1} doesn't follow ${userid2}`);
        return false;
    }

    var result=await followings.findOne({"follower" : userid2 , "is_following" : userid1});

    if (result===null){
        console.log(`${userid2} doesn't follow ${userid1}`);
        return false;
    }

    return true;
}



async function unfollow(followerid,followedid){

    if (followerid === followedid) {
        console.log("You cannot follow yourself");
        return false;
    }
    if (followerid === null || followedid === null) {
        console.log("You cannot follow a null user");
        return false;
    }
    if (users.findOne({ "username": followerid }) === null || users.findOne({ "username": followedid }) === null) {
        console.log("You cannot follow a non-existing user");
        return false;
    }


    const result = await followings.deleteOne({"followerid" : followerid , "is_following" : followedid});

    if (result.deletedCount===0){
        console.log(`${followerid} wasn't following ${followedid}`);
        return false;
    }

    console.log(`${followerid} unfollowed ${followedid}`);
    return true;
}




/**
 * Check if followerid is following followingid
 * @param {string} followerid 
 * @param {string} followingid 
 * @returns {boolean} 
 */
async function is_following(followerid,followingid){
    const result = await followings.findOne({"followerid" : followerid , "is_following" : followingid});

    return ((result!==null));
}

