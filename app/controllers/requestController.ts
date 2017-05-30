import { Router, Request, Response } from 'express';
import { TatoebaTranslation } from '../models/TatoebaTranslation';
let request = require('request');
let cheerio = require('cheerio');
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
	res.send('こんにちは');
});

router.get('/:kanji', (req: Request, res: Response) => {
	const { kanji } = req.params;

    // test url
    const url:string = 'https://tatoeba.org/eng/sentences/search?from=jpn&to=eng&query=' + encodeURIComponent(kanji);

    // TODO: Breaking on longer inputs　(4+), like: 
    // https://tatoeba.org/eng/sentences/search?query=%E8%87%AA%E5%8B%95%E8%B2%A9%E5%A3%B2%E6%A9%9F&from=jpn&to=eng
    // 自動販売機


    request(url, (error, response, html) => {


        if(!error){

            let $ = cheerio.load(html);
            let retval:Array<TatoebaTranslation> = [];

            // sentences in Tatoeba have the class sentence-and-translations
            let sentences = $('.sentence-and-translations').toArray();

            //iterate over each sentence, and build the return object
            sentences.forEach((current, index, array) => {
            	let obj:TatoebaTranslation = {english:[], japanese:""};
            	let eng = $(current).find('.translation .text').toArray();
            	obj.japanese = $(current).find('.sentence .text').text().trim();
            	eng.forEach(function(c,i,a){
            		obj.english.push($(c).text().trim());
            	});

            	retval.push(obj);
            });
           
			res.json(retval);

        }else{
        	console.log('ERROR: ', error);
        }
    });
});

export const RequestController: Router = router;