const dns = require('node:dns');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not set in .env');
}

const client = new MongoClient(uri);

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
