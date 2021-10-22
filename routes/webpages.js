module.exports = function(router, checkAuthenticated){

  router.get('/index', checkAuthenticated,(req, res) => {
    res.render('index.html');
  })

  router.get('/members', checkAuthenticated,(req, res) => {
    res.render('members.html');
  })

  router.get('/transactions', checkAuthenticated,(req, res) => {
    res.render('transactions.html');
  })

  router.get('/subscriptions', checkAuthenticated,(req, res) => {
    res.render('subscriptions.html');
  })

  router.get('/reporting', checkAuthenticated,(req, res) => {
    res.render('reporting.html');
  })

  router.get('/settings', checkAuthenticated,(req, res) => {
    res.render('settings.html');
  })
}