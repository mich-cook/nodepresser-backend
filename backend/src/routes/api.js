import { MongoClient } from 'mongodb';

export default function(app, collection) {

  const withDB = async (operations, res) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URI, { "useNewUrlParser": true }); // , "useUnifiedTopology": true });
      const db = client.db('fallen-tree');

      await operations(db);

      client.close();
    } catch(e) {
      res.status(500).json({ "message": "Error connecting to db", e});
    }
  };

  app.get('/api/articles/:name', async (req, res) => {
    withDB(async (db) => {
      const articleName = req.params.name;

      const articleInfo = await db.collection('articles').findOne({ "name": articleName });
      res.status(200).json(articleInfo);
    }, res);
  });

  app.post('/api/articles/:name/upvote', async (req, res) => {
    withDB(async (db) => {
      const articleName = req.params.name;

      const articleInfo = await db.collection('articles').findOne({ "name": articleName });
      await db.collection('articles').updateOne({ "name": articleName }, {
        '$set': {
          "upvotes": articleInfo.upvotes + 1
        }
      });

      const updatedArticleInfo = await db.collection('articles').findOne({ "name": articleName });

      res.status(200).json(updatedArticleInfo);
    }, res);
  });

  app.post('/api/articles/:name/add-comment', async (req, res) => {
    withDB(async (db) => {
      const articleName = req.params.name;
      const { username, text} = req.body;

      const articleInfo = await db.collection('articles').findOne({ "name": articleName });
      await db.collection('articles').updateOne({ "name": articleName }, {
        '$set': {
          "comments": articleInfo.comments.concat({ username, text })
        }
      });

      const updatedArticleInfo = await db.collection('articles').findOne({ "name": articleName });

      res.status(200).json(updatedArticleInfo);

    }, res);
  });

  // send everything that didn't match above to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });

};
