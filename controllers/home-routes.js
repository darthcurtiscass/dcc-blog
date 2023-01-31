const router = require('express').Router();
const auth = require('../utils/auth');
const axios = require('axios')

router.get('/home', auth, async (req, res) => {
    try {
        axios.get('/api/posts').then(posts => {
            res.render('posts', { posts })
        })
        
    } catch (err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
})

module.exports = router;