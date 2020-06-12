export default function(app, withDB) {

  app.get('/api/articles/:name', async (req, res) => {
    withDB(async (db) => {
      const articleName = req.params.name;

      const articleInfo = await db.collection('articles').findOne({ "name": articleName });
      res.status(200).json(articleInfo);
    }, res);
  });

};
