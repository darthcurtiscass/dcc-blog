const router = require('express').Router();
const Category = require('../../models/Category');
const auth = require('../../utils/auth');

router.get("/", auth, async (req, res) => {
    try {
        const categoriesData = await Category.findAll();
        const categories = categoriesData.map((category) => category.get({ plain: true}));
        // res.status(200).json(categories)
        res.render('categories', { categories })
        
    } catch(err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
})

module.exports = router;