/**
 * Created by Mothra on 9/28/15.
 */
var express = require('express');
var router = express.Router();
var Costume = require('../models/costumes.js');

router.get('/',function(req,res,next){
    return Costume.find({}).exec(function(err, costumes){
        if(err) {
            throw err;
        } else{
            res.send(JSON.stringify(costumes));
        }
    });
});

router.put('/', function(req, res, next){
    Costume.findByIdAndUpdate(req.body._id, req.body, function(err, costume) {
        if(err) console.log(err);
        res.send(costume);
    })
});

router.post('/', function(req,res,next){
    Costume.create(req.body, function (err, costume) {
       if(err){
            res.status(400).send(err.message);
        } else{
            res.sendStatus(200);
        }
    })
});

module.exports = router;
