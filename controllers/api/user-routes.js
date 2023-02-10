const router = require('express').Router();
const User = require('../../models/User');
const auth = require('../../utils/auth')
//retrieve all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        const users = userData.map((user) => user.get({ plain : true}))
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json(err)
    }
});

//find a specific user by their id
router.get('/:id', async (req, res) => {
    try {
        const oneUser = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(oneUser)
    } catch (err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});

//user login route to establish a loggedIn session and save their user_id, user_name, and user_email.
router.post('/login', async (req, res) => {
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

//create new user and login session
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
          req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = newUser.id;
            req.session.user_name = newUser.name;
            req.session.user_email = newUser.email;
         
          res.status(200).json(newUser);
            }); 
        } catch (err) {
            console.log(err);
            console.log(newUserData);
            res.status(500).json({message:'an error occurred, please try again.', err})
        }
});
//update a user based on their id
router.put('/:id', async (req, res) => {
    try {
        const updateUser = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.json(updateUser)
    } catch (err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
//route to delete a user based on their id.
router.delete('/:id', async (req, res) => {
    const deleteUser = await User.destroy({ where: {id: req.params.id}})
      return res.json(deleteUser)
  });
  
module.exports = router;