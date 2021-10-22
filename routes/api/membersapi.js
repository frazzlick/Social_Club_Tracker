var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const fs = require('fs')
const uuid = require('uuid')


module.exports = function(router, url){
    
    router.get('/api/members', function(req, res, next){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection("Members")
                .find({tenant_id: req.user.tenant_id})
                .sort({name: 1})
                .toArray(function(err, result){
                res.send(result);
            });
        });
    })
    
    router.post('/api/members', function(req, res, next){
        MongoClient.connect(url, function(err, db){
            for(let i = 0; i < req.body.length; i++){
                var dbo = db.db("Social_Clubs_v1");
                dbo.collection('Members').updateMany({ '_id' : new ObjectId(req.body[i]._id)},
                {$set : {tenant_id: req.user.tenant_id, 
                    id : req.body[i].id, 
                    name : req.body[i].name, 
                    active: returnBoolean(req.body[i].active),
                    balance: req.body[i].balance,
                    charges: parseFloat(req.body[i].charges).toFixed(2),
                    start_date: req.body[i].start_date,
                    end_date: req.body[i].end_date
                }},
                {upsert: true})
            }
        });
    })

    router.delete('/api/members',async function(req, res, next){
        console.log(req.body)
        res.end()
        MongoClient.connect(url, async function(err, db){
            for(let i = 0; i < req.body.length; i++){ 
                var dbo = db.db("Social_Clubs_v1");
                    dbo.collection('Members').deleteMany({'_id' : ObjectId(req.body[i]._id)}, true)
                }
            });
    })

    
}


function returnBoolean(boolean){
    if(boolean == 'true'){
        return true
    }
    return false
}