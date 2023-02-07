const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const {Comment} = require('../models')

router.get('/', async (req, res) => {
    try {
        const dashData = await User.findAll(req.session.user_id, {
            include: [
                {
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'content',
                    ]
                }
            ]
        })
    } catch {
        console.log(err)
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});

