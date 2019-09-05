module.exports = router => {

  const controllers = require('./controllers')

  router.post('/v1/api/user', controllers.create)
}