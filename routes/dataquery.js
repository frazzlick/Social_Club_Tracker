const e = require('express');

module.exports = function(router, checkAuthenticated, checkNotAuthenticated, url, bcrypt, users){
    let fs = require('fs');
    router.get('/members', function(req, res, next){
        fs.readFile('server_files/members.json', function(err, data){
            if(err){
                throw(err);
            } else{
                res.send(JSON.parse(data));
            }
        })
    })

    router.post('/members', function(req, res, next){
        console.log(req.body);
        fs.writeFileSync('server_files/members.json', JSON.stringify(req.body), function(err, data){

        })
    })
}


