var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
app.get('/scrape/:kanji', function (req, res) {
    var kanji = req.params.kanji;
    var url = 'https://tatoeba.org/eng/sentences/search?from=jpn&to=eng&query=' + encodeURIComponent(kanji);
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var retval = [];
            var sentences = $('.sentence-and-translations').toArray();
            sentences.forEach(function (current, index, array) {
                var obj = {};
                var eng = $(current).find('.translation .text').toArray();
                obj.english = [];
                obj.japanese = $(current).find('.sentence .text').text().trim();
                eng.forEach(function (c, i, a) {
                    obj.english.push($(c).text().trim());
                });
                retval.push(obj);
            });
            res.json(retval);
        }
        else {
            console.log('ERROR: ', error);
        }
    });
});
app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;
//# sourceMappingURL=server.js.map