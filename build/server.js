var express = require('express');
var monk = require('monk');
var controllers_1 = require('./controllers');
var controllers_2 = require('./controllers');
var app = express();
var port = process.env.PORT || 9999;
var db = monk('localhost:27017/oboeru_v1');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(function (req, res, next) {
    req.db = db;
    next();
});
app.use('/scrape', controllers_1.RequestController);
app.use('/data', controllers_2.DatabaseController);
app.listen(port, function () {
    console.log("Starting Tatoeba scraper on " + port);
});
exports = module.exports = app;
