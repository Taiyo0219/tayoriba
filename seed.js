const { connectToDatabase, getSupportsCollection } = require('./db/mongo');
const supports = require('./data/seedSupports');

async function seed() {
  try {
    await connectToDatabase();
    const collection = getSupportsCollection();
    await collection.deleteMany({});
    await collection.insertMany(supports);
    console.log(`Inserted ${supports.length} support records.`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  }
}

seed();
