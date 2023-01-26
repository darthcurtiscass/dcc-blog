const sequelize = require('../config/connection');
const {Post, User} = require('../models');

const posts = require('./post-seeds.js')

const seedDatabase = async() => {
    await sequelize.sync({ force: true});
    await Post.bulkCreate(posts);

    await User.create({
        name: 'Dylan',
        email: 'dylancurtiscassagnol@icloud.com',
        password: 'PASSword',
    })
}; 

seedDatabase();