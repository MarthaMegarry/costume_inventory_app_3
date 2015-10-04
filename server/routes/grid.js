/**
 * Created by Mothra on 9/28/15.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multiparty = require('connect-multiparty')();

var Costume = require('../models/costumes.js');

router.get('/',function(req,res){
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

router.post('/', function(req,res){
    Costume.create(req.body, function (err, costume) {
       if(err){
            res.status(400).send(err.message);
        } else{
            res.sendStatus(200);
        }
    })
});

router.post('/upload', multiparty, function(req,res,next){
    console.log(req.files.file);
    //Check to see if our directory exists
    try {
        fs.mkdirSync(path.join(__dirname, "../public/images/uploads/"));
    } catch(e) {
        if (e.code != 'EEXIST') {
            res.send(e);
            console.log("ERROR!" + e + " error1");
            return;
        }
    }
    var file = req.files.file;
    var is = fs.createReadStream(file.path);
    var os = fs.createWriteStream(path.join(__dirname, "../public/images/uploads/", file.name));
    is.pipe(os);

    os.on('error', function(err) {
        if(err) {
            console.log(err + " error2");
        }
        res.send(err);
    });
    is.on('end', function() {
        fs.unlink(file.path, function(err) {
            if(err) {
                console.log(err + " error3");
            }
        });
        res.send("/images/uploads/" + file.name);
    });
});

module.exports = router;
