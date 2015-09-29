/**
 * Created by Mothra on 9/28/15.
 */
var express = require('express');
var router = express.Router();
var Costume = require('../models/costumes.js');

router.get('/',function(req,res,next){
    //res.send("made it to the grid router");
    return Costume.find({}).exec(function(err, costumes){
        if(err) {
            throw err;
        } else{
            res.send(JSON.stringify(costumes));
        }
    });
});

module.exports = router;
