const e = require('express');
const transactions = require('./processing/transactions.js')
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const fs = require('fs')
const uuid = require('uuid')

module.exports = function(router, checkAuthenticated, checkNotAuthenticated, url, bcrypt, users){
    
    router.get('/api/members', function(req, res, next){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection("Members")
                .find({tenant_id: req.user.tenant_id})
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
                    balance: req.body[i].balance}},
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
                    matched: replaceNull(req.body[i].matched)
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

    router.get('/api/coding', function(req, res, next){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection("Coding")
                .find({tenant_id: req.user.tenant_id})
                .limit(Number(req.query.limit))
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

    router.get('/api/months', function(req, res, next){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection("Months")
                .find({})
                // .limit(Number(req.query.limit))
                .toArray(function(err, result){
                res.send(result);
            });
        });
    })

    router.get('/api/settings/users', function(req, res, next){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection("users")
                .find({tenant_id: req.user.tenant_id})
                .project({password: 0})
                // .limit(Number(req.query.limit))
                .toArray(function(err, result){
                res.send(result);
            });
        });
    })

    router.post('/api/settings/users', async function(req, res, next){
        MongoClient.connect(url, function(err, db){
            for(let i = 0; i < req.body.length; i++){
                var dbo = db.db("Social_Clubs_v1");
                dbo.collection('users').updateMany({ '_id' : new ObjectId(req.body[i]._id)},
                {$set : {tenant_id: req.user.tenant_id,
                    name : req.body[i].name, 
                    email : req.body[i].email,
                    active: req.body[i].active
                }},
                {upsert: true})
            }
        });
    })


    router.post('/register', checkNotAuthenticated, async function(req, res){

        MongoClient.connect(url, async function(err, db){
            var dbo = db.db('Social_Clubs_v1');
            dbo.collection('users')
            .find({'email' : req.body.email})
            .toArray( async function(err, result){
                if(result.length == 0){
                    try{
                        const hashedPassword = await bcrypt.hash(req.body.password, 10);
                        MongoClient.connect(url, function(err, db){
                            var dbo = db.db("Social_Clubs_v1");
                            dbo.collection("users")
                            .updateMany({ '_id' : new ObjectId(req.body._id)},
                            {$set : {name : req.body.name, 
                                password : hashedPassword, 
                                email : req.body.email, 
                                active : true,
                                tenant_id: uuid.v1()}},
                            {upsert: true})
                        res.redirect('/login');
                        });
                    } catch{
                        res.redirect('/register');
                    }        
                } else {
                    res.redirect('/login');
                }
        
            });
        }); 
    });

    router.get('/api/settings/users', checkAuthenticated, (req, res) =>
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection("users")
                .find({tenant_id: req.user.tenant_id},{_id: 0})
                .limit(Number(req.query.limit))
                .toArray(function(err, result){
                res.send(result);
            });
        })
    );

    router.post('/api/settings/users', async function(req, res, next){
        
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        MongoClient.connect(url, function(err, db){
            for(let i = 0; i < req.body.length; i++){
                var dbo = db.db("Social_Clubs_v1");
                dbo.collection('users').updateMany({ '_id' : new ObjectId(req.body[i]._id)},
                {$set : {tenant_id: req.user.tenant_id,
                    name : req.body[i].name,
                    email: req.body[i].email,
                    active: req.body[i].active
                    // password: hashedPassword
                }},
                {upsert: true})
            }
        });
    })

    router.get('/login', checkNotAuthenticated, (req, res) => {
        MongoClient.connect(url, function(err, db){
            users.splice(0, users.length)
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection("users")
            .find({})
            .toArray(function(err, result){
                if(err){
                    console.log(err);
                }
                for(let i of result){
                    users.push(i);
                }
            });
            
        });
        res.render('login.html');
    });

    router.get('/api/subscriptions', function(req, res, next){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection("Subscriptions")
                .find({tenant_id: req.user.tenant_id},
                    req.query.find)
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
                    members: req.body[i].members
                }},
                {upsert: true})
            }
        });
    })

    router.delete('/api/subscriptions', function(req, res, next){
        res.end()
        MongoClient.connect(url, async function(err, db){
            var dbo = db.db("Social_Clubs_v1");
            dbo.collection('Subscriptions').deleteOne({'_id' : ObjectId(req.body._id)}, true)
        });
    })

    router.post('/api/settings/users/passwordreset', checkAuthenticated, async (req, res) => {
        console.log(req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        MongoClient.connect(url, async function(err, db){
            var dbo = db.db('Social_Clubs_v1');
            dbo.collection('users')
            .updateMany({ '_id' : new ObjectId(req.body.data._id)},
            {$set : {password : hashedPassword}},
            {upsert: true})
        })
    })

    function returnBoolean(boolean){
        if(boolean === 'true'){
            return true
        }
        return false
    }
}