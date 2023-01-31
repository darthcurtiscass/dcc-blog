const router = require('express').Router();
const { Comment } = require('../../models')
const auth = require('../../utils/auth');

router.get("/", auth, async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        const comments = commentData.map((post) => post.get({ plain: true}));
        res.status(200).json(comments)
        
    } catch(err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});
//retrieve one post by its id
router.get('/:id', async (req, res) => {
    try {
        const oneComment = await Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(oneComment)
    } catch (err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});

module.exports = router;