const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not set in .env');
}

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB');
  }
  return db;
}

function getSupportsCollection() {
  if (!db) {
    throw new Error('Database connection is not established');
  }
  return db.collection('supports');
}

module.exports = {
  connectToDatabase,
  getSupportsCollection,
};
