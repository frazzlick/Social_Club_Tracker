const subs = require('../processing/eventcosts.js')

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const fs = require('fs')
const uuid = require('uuid')

module.exports = function(router, url){

    router.get('/api/subscriptions', function(req, res, next){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection("Subscriptions")
                .find({tenant_id: req.user.tenant_id},
                    req.query.find)
                .sort({start_date: -1})
                .project({tenant_id: 0})
                .toArray(function(err, result){
                res.send(result);
            });
        });
    })

    router.post('/api/subscriptions', async function(req, res, next){
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        MongoClient.connect(url, function(err, db){
            for(let i = 0; i < req.body.length; i++){
                var dbo = db.db("Social_Clubs_v1");
                dbo.collection('Subscriptions').updateMany({ '_id' : new ObjectId(req.body[i]._id)},
                {$set : {tenant_id: req.user.tenant_id,
                    id : req.body[i].id,
                    description: req.body[i].description,
                    start_date: req.body[i].start_date,
                    end_date: req.body[i].end_date,
                    price: req.body[i].price,
                    members: membersArray(req.body[i].members)
                }},
                {upsert: true})
            }
        });

        subs.processSubs(url, req.user)

        function membersArray(members)
        {
            if(!Array.isArray(members)){
                return []
            }
            return members
        }
    })

    router.delete('/api/subscriptions', function(req, res, next){
        res.end()
        MongoClient.connect(url, async function(err, db){
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection('Subscriptions').deleteOne({'_id' : ObjectId(req.body._id)}, true)
        });
    })
}
