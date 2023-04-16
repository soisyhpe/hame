// dependencies
const { MongoClient, ServerApiVersion } = require('mongodb');

// mongodb stuff
const CLIENT = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const DATABASE_NAME = 'Hame';
const DATABASE = CLIENT.db(DATABASE_NAME);

module.exports = { DATABASE };