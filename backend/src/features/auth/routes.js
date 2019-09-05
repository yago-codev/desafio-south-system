module.exports = router => {

  const controllers = require('./controllers')

  router.post('/v1/api/auth', controllers.auth)
}