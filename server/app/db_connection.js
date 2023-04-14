// dependencies
const { MongoClient, ServerApiVersion } = require('mongodb');

// mongodb stuff
const URI = "mongodb+srv://Norras:Y1jGNQyOv8bZa0Sn@hame.jlet2.mongodb.net/?retryWrites=true&w=majority"; // todo URI via .env
const CLIENT = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const DATABASE_NAME = 'Hame';
const DATABASE = CLIENT.db(DATABASE_NAME);

module.exports = { DATABASE };