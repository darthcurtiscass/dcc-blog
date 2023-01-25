const router = require('express').Router();
const User = require('../../models/User');

router.post('/login', async (req, res) => {
    try {
       const userDb = await User.findOne({
        where: {
            email: req.body.email,
        }
       });
       if (!userDb) {
        res.status(404).json({message: "error"})
        return;
       }

       const validPassword = await bcrypt.compare(req.body.password, userDb.password);
       if (!validPassword) {
        res.status(404).json({message: "error"})
       }

       req.session.save(() => {
        req.session.loggedIn = true;
        res.status(200).json({message: 'Login Successful'});
       })
    } catch(err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
})

module.exports = router;