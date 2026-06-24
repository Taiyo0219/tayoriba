const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const supportsRouter = require('./routes/supports');
const { connectToDatabase } = require('./db/mongo');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/supports', supportsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });
––