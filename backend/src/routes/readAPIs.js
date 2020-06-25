export default function(app, withDB) {

  // has to be before /api/articles/:author so it doesn't try to match "top" as an author
  app.get('/api/articles/top', async (req, res) => {
    withDB(async (db) => {
      const pipeline = [
        { "$match": { "deleted": false }},
        { "$sort": { "edit": -1, "_id": -1 }},
        { "$limit": 5 }
      ];
      const articles = await db.collection('articles').aggregate(pipeline).toArray();
      res.status(200).json({ "articles": articles });
    }, res);
  });

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

  app.get('/api/article/:author/:slug', async (req, res) => {
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

  app.get('/api/authors/top', async (req, res) => {
    withDB(async (db) => {
      const pipeline = [
        { "$match": { "deleted": false }},
        { "$group": { "_id": "$author", "count": { "$sum": 1 }}},
        { "$sort": { "count": -1, "_id": -1 }},
        { "$limit": 5 }
      ];
      const authors = await db.collection('articles').aggregate(pipeline).toArray();
      res.status(200).json({ "authors": authors });
    }, res);
  });

};
