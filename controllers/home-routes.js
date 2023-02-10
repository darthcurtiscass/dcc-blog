const router = require('express').Router();
// const Post = require('../models/Post');
// const User = require('../models/User');
const {Comment, Post, User} = require('../models')

router.get('/homepage', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                        'name',
                    ]
                },
                {
                    model: Comment,
                },
            ]
        })
        // console.log('========================')
        // console.log(postData)
        // console.log('=========================')
        const posts = postData.map((post) => post.get({ plain: true }));
        console.dir(posts, {depth: null})
        res.render('homepage', { 
            posts, 
            loggedIn: req.session.loggedIn 
          });

    } catch (err) {
        console.log(err)
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});

module.exports = router;

