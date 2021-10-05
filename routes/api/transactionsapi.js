

const transactions = require('./processing/transactions.js')

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const uuid = require('uuid')

module.exports = function(router, url){
        
    router.get('/api/transactions', function(req, res, next){
        const query = {...{tenant_id: req.user.tenant_id}, ...req.query.find}
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection("Transactions")
                .find(query)
                // .limit(Number(req.query.limit))
                .toArray(function(err, result){
                res.send(result);
            });
        });
    })

    router.post('/api/transactions', async function(req, res, next){
        MongoClient.connect(url, function(err, db){
            for(let i = 0; i < req.body.length; i++){
                const date_generator = transactions.formatDate(req.body[i].date)
                var dbo = db.db("Social_Clubs_v1");
                dbo.collection('Transactions').updateMany({ '_id' : new ObjectId(req.body[i]._id)},
                {$set : {tenant_id: req.user.tenant_id,
                    id : checkid(req.body[i].id), 
                    name : req.body[i].name,
                    date: date_generator.next().value,
                    month: date_generator.next().value,
                    year: date_generator.next().value,
                    monthyear: date_generator.next().value,
                    transaction_type: req.body[i].transaction_type,
                    particulars: req.body[i].particulars,
                    code: req.body[i].code,
                    reference: req.body[i].reference,
                    amount: req.body[i].amount,
                    matched: replaceNull(req.body[i].matched),
                    member: req.body[i].member
                }},
                {upsert: true})
            }

            function checkid(id){
                if(id === undefined){
                    id = uuid.v1()
                    return id
                }
                return id
            }

            function replaceNull(data){
                if(data == null){
                    return ''
                }
                return data
            }
        });
        
    })

    router.delete('/api/transactions', function(req, res, next){
        res.end()
        MongoClient.connect(url, async function(err, db){
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection('Transactions').deleteOne({'_id' : ObjectId(req.body._id)}, true)
        });
    })
}