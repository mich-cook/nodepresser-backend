import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './routes/api.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());

routes(app);

// until we have npx installed, this is how you start it:
// # nodejs node_modules/@babel/node/bin/babel-node.js src/server.js

app.listen(port, () => console.log(`Listening on port ${port}...`));
