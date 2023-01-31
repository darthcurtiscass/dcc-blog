const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes')

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
