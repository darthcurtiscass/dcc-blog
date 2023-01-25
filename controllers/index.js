const router = require('express').Router();
const routes = require('./api')
const userApiRoutes = require('./api/userRoutes')

router.use('/api/routes', routes)
router.use('/api/user', userApiRoutes);

module.exports = router;