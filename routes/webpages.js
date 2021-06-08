module.exports = function(router, checkAuthenticated){

  router.get('/index', checkAuthenticated,(req, res) => {
    res.render('index.html');
  })
}