//let express = require('express');
import * as express from 'express';
import { RequestController } from './controllers';

const app: express.Application = express();
const port: number = process.env.PORT || 3000;

app.use('/scrape', RequestController);

app.listen(port, () => {
    console.log(`Starting Tatoeba scraper on ${port}`);
});

exports = module.exports = app;