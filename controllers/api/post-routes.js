const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const auth = require('../../utils/auth');
//retrieve all posts
router.get("/", auth, async (req, res) => {
    try {
        const postsData = await Post.findAll({
            include: [
                {
                    model: Comment,
                }
                
            ]
        });
        
        const posts = postsData.map((post) => post.get({ plain: true}));
        console.log("New Posts", posts);
        res.status(200).json(posts)
        // res.render('posts', { posts }) Use on home routes
        
    } catch(err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});
//retrieve one post by its id
router.get('/:id', async (req, res) => {
    try {
        const onePost = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User
                }
            ]
        })
        // res.status(200).json(onePost)
        const post = onePost.get({ plain: true });
        console.dir(post, {depth: null})
        res.render('post', {post, logged_in: req.session.logged_in})
    } catch (err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const newPost = await Post.create({
            id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.post_id = newPost.id
        
        res.status(200).json(newPost);
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({message:'an error occurred, please try again.', err})
        }
    });
//update post by id
router.put('/post/:id', async (req, res) => {
    try {
        const updatePost = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        const response = req.body
        return res.status(200).json(response);
    } catch (err) {
        res.status(500).json({message:'an error occurred, please try again.'})
    }
});

router.get('/mypost/:id', auth, async (req, res) => {
    try {
      const userPosts = await Post.findOne({
        where: {
            id: req.params.id
        },
      })
      const postSingular = userPosts.get({ plain: true });
          console.dir(postSingular, {depth: null})
        //   res.status(200).json(userPosts);
          res.render('userposts', {
            postSingular, 
            loggedIn: req.session.loggedIn
          })
    } catch (err) {
      res.status(500).json({message:'an error occurred, please try again. you idiot', err})
    }
  });

router.delete('/mypost/delete/:id', auth, async (req, res) => {
    const deletePost = await Post.destroy({ where: {id: req.params.id}})
      return res.json(deletePost)
  });   

module.exports = router;