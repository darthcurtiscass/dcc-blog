const router = require('express').Router();
const { Comment, Post } = require('../../models')
const auth = require('../../utils/auth');

router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        const comments = commentData.map((post) => post.get({ plain: true}));
        res.status(200).json(comments)
        
    } catch(err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});
//retrieve one comment by its id
router.get('/:id', async (req, res) => {
    try {
        const oneComment = await Comment.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(oneComment)
    } catch (err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});
//create a new comment
router.post('/', async (req, res) => {
    const body = req.body
    try {
        const newComment = await Comment.create({
            ...body,
            user_id: req.session.user_id,
        });
        req.session.save(() => {
            req.session.loggedIn = true;

        console.log(newComment);
        res.status(200).json(newComment);
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({message:'an error occurred, please try again.', err})
        }
    });

module.exports = router;