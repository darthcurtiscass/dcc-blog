const router = require('express').Router();
const userRoutes = require('./userRoutes');
const routes = require('./routes');

router.use('/users', userRoutes);
router.use('/routes', routes);

module.exports = router;
