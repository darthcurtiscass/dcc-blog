const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const {Comment} = require('../models')

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
                    attributes: [
                        'id',
                        'date',
                        'content',
                    ]
                },
            ]
        })
        console.log(postData)
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(...posts);
        res.render('homepage', { 
            ...posts, 
            loggedIn: req.session.loggedIn 
          });

    } catch (err) {
        console.log(err)
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});

module.exports = router;

module.exports = router;