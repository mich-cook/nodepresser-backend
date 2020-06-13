export default function(app, withDB) {

  app.get('/api/articles/:author', async (req, res) => {
    const author = req.params.author;

    withDB(async (db) => {
      const articles = await db.collection('articles').find({ author }).toArray();

      if (articles !== null) {
        res.status(200).json(articles);
      } else {
        res.status(404).json({ "status": "fail", "message": "article not found", "author": author });
      }
    }, res);
  });

// decide what other ways we want to make an article or articles available via the API
// design the API to support those
/*
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
*/

  app.get('/api/articles/:author/:slug', async (req, res) => {
    const author = req.params.author;
    const slug = req.params.slug;

    withDB(async (db) => {
      const article = await db.collection('articles').findOne({ author, slug });  // this SHOULD be unique
      if (article !== null) {
        res.status(200).json(article);
      } else {
        res.status(404).json({ "status": "fail", "message": "article not found", "name": article });
      }
    }, res);
  });

};