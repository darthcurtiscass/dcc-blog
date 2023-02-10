const router = require('express').Router();
const User = require('../../models/User');

router.get('/', (req, res) => {
  // res.status(200).json("work");
  // console.log("working");
  try {res.render('login');}
  catch (err){
      console.log(err);
    res.status(500).json(err);
  }
});

router.get('/', (req, res) => {
    // res.status(200).json("work");
    // console.log("working");
    try {res.render('login');}
    catch (err){
        console.log(err);
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
      const userData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = userData.id;
        req.session.user_name = userData.name;
        req.session.user_email = userData.email;

        res
          .status(200)
          .json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//   router.get('/login', (req, res) => {
//     res.console.log("working");
//     // try {res.render('login');}
//     // catch (err){
//     //     console.log(err);
//     //   res.status(500).json(err);
//     // }
// });

module.exports = router;