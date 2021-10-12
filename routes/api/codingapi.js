

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const fs = require('fs')
const uuid = require('uuid')

module.exports = function(router, url){

    router.get('/api/coding', function(req, res, next){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection("Coding")
                .find({tenant_id: req.user.tenant_id})
                // .limit(Number(req.query.limit))
                .toArray(function(err, result){
                res.send(result);
            });
        });
    })

    router.post('/api/coding', async function(req, res, next){
        MongoClient.connect(url, function(err, db){
            for(let i = 0; i < req.body.length; i++){
                var dbo = db.db("Social_Clubs_v1");
                dbo.collection('Coding').updateMany({ '_id' : new ObjectId(req.body[i]._id)},
                {$set : {tenant_id: req.user.tenant_id,
                    id : req.body[i].id, 
                    Description : req.body[i].Description,
                    Parent: req.body[i].Parent,
                    Active: req.body[i].Active
                }},
                {upsert: true})
            }
        });
    })

    router.delete('/api/coding', function(req, res, next){
        res.end()
        MongoClient.connect(url, async function(err, db){
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection('Coding').deleteOne({'_id' : ObjectId(req.body._id)}, true)
        });
    })
}