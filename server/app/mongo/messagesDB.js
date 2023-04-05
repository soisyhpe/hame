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