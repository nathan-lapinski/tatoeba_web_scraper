//let express = require('express');
import * as express from 'express';
import { RequestController } from './controllers';

const app: express.Application = express();
const port: number = process.env.PORT || 9999;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/scrape', RequestController);

app.listen(port, () => {
    console.log(`Starting Tatoeba scraper on ${port}`);
});

exports = module.exports = app;