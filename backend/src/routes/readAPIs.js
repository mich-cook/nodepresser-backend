export default function(app, withDB) {

  app.get('/api/articles/:slug', async (req, res) => {
    withDB(async (db) => {
      const articleName = req.params.name;

      const articleInfo = await db.collection('articles').findOne({ "name": articleName });
      if (articleInfo !== null) {
        res.status(200).json(articleInfo);
      } else {
        res.status(404).json({ "status": "fail", "message": "article not found", "name": articleName });
      }
    }, res);
  });

};
