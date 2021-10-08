
module.exports = function(router){
    
    router.get('/api/current_user', function(req, res, next){
        res.send(req.user)
    })
}