import bodyParser from 'body-parser';

export default function(app, withDB) {

  // TODO: user auth/auth required here for author(s) to log in

  app.use(bodyParser.json());

  app.route('/api/articles/')
    .post( async (req, res) => {

      // TODO: Validate all the data
      // TODO: Ensure that user+slug is unique

      const { username, title, slug, publish, text } = req.body;
      const create = 'now timestamp';          // eventually a timestamp too
      const edit = 'now timestamp';            // or just undefined?

      const article = {
        "author": username,
        title,
        slug,
        "dates": {
          create,
          publish,
          edit,
        },
        "deleted": false,
        "content": text
      };

      withDB(async (db) => {
        const articleWrite = await db.collection('articles').insertOne(article);
        res.status(200).json(articleWrite.ops);
      }, res);
    });

  // TODO: also, write these.
  app.route('/api/articles/:id')
    .post((req, res)   => {})
    .put((req, res)    => {})
    .delete((req, res) => {});

};
