import { Router, Request, Response } from 'express';
let request = require('request');

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    console.log('to the db!');
    var db = req.db;
    var collection = db.get('kanji');
    collection.find({},{},function(e,docs){
        if(e) console.log(e);
        console.log(docs);
        res.json({
            "data" : docs
        });
    });
});

export const DatabaseController: Router = router;