const router = require('express').Router();
const { Post } = require('../../models');
const auth = require('../../utils/auth');
//retrieve all posts
router.get("/", auth, async (req, res) => {
    try {
        const postsData = await Post.findAll();
        const posts = postsData.map((post) => post.get({ plain: true}));
        res.status(200).json(posts)
        // res.render('posts', { posts }) Use on home routes
        
    } catch(err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});
//retrieve one post by its id
router.get('/:id', async (req, res) => {
    try {
        const onePost = await Post.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(onePost)
    } catch (err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id:req.session.user_id
        })
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;