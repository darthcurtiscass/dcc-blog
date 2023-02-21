const auth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/api/login');
    } else {
        next();
    }
}

module.exports = auth;