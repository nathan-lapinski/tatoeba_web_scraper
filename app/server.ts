//let express = require('express');
import * as express from 'express';
import * as mongo from 'mongodb';
import * as monk from 'monk';
import { RequestController } from './controllers';
import { DatabaseController } from './controllers';

const app: express.Application = express();
const port: number = process.env.PORT || 9999;
const db = monk('localhost:27017/oboeru_v1');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/scrape', RequestController);

app.use('/data', DatabaseController);

app.listen(port, () => {
    console.log(`Starting Tatoeba scraper on ${port}`);
});

exports = module.exports = app;