import { MongoClient } from 'mongodb';

import readRoutes from './readAPIs.js';
import userRoutes from './userAPIs.js';
import authorRoutes from './authorAPIs.js';

export default function(app) {

  const withDB = async (operations, res) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URI, { "useNewUrlParser": true, "useUnifiedTopology": true });
      const db = client.db('fallen-tree');

      await operations(db);

      client.close();
    } catch(e) {
      res.status(500).json({ "message": "Error connecting to db", e});
    }
  };

  readRoutes(app, withDB);
  userRoutes(app, withDB);
  authorRoutes(app, withDB);

  // send everything that didn't match above to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });

};
