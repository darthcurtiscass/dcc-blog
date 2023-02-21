const router = require('express').Router();
// const Post = require('../models/Post');
// const User = require('../models/User');
const {Comment, Post, User} = require('../models')

router.get('/', async (req, res) => {
    try {
        const dashData = await Post.findAll(req.body, {
            where: {
                user_id:  req.session.user_id
            },
        });
        const myPosts = dashData.map((posts) => posts.get({ plain: true }));
        res.render('dashboard', { 
            myPosts, 
            loggedIn: req.session.loggedIn 
          });
    } catch (err) {
        console.log(err)
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});

module.exports = router;