const router = require('express').Router();
const Post = require('../../models/Post');
const auth = require('../../utils/auth');

router.get("/", auth, async (req, res) => {
    try {
        const postsData = await Post.findAll();
        const posts = postsData.map((post) => post.get({ plain: true}));
        res.status(200).json(posts)
        // res.render('posts', { posts }) Use on home routes
        
    } catch(err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
})



module.exports = router;