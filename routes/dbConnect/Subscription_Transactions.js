
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const uuid = require('uuid')

module.exports = function(router, checkAuthenticated, checkNotAuthenticated, url, bcrypt, users){

    router.get('/api/subscription_transactions', function(req, res, next){
        const query = {...{tenant_id: req.user.tenant_id}, ...req.query.find}
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection("Subscription_Transactions")
                .find(query)
                .toArray(function(err, result){
                res.send(result);
            });
        });
    })

    router.post('/api/subscription_transactions'), function(req, res, next){
        MongoClient.connect(url, function(err, db){
            for(let i = 0; i < req.body.length; i++){
                var dbo = db.db("Social_Clubs_v1");
                dbo.collection('Subscription_Transactions').updateMany({ '_id' : new ObjectId(req.body[i]._id)},
                {$set : {tenant_id: req.user.tenant_id,
                    id : req.body[i].id, 
                    Description : req.body[i].Description,
                    Parent: req.body[i].Parent,
                    Active: req.body[i].Active
                }},
                {upsert: true})
            }
        });
    }
}