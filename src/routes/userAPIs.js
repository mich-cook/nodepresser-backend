export default function(app, withDB) {

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

};
