const sequelize = require('../config/connection');
const {Category, User} = require('../models');

const categories = require('./categories.js')

const seedDatabase = async() => {
    await sequelize.sync({ force: true});
    await Category.bulkCreate(categories);

    await User.create({
        name: 'Dylan',
        email: 'dylancurtiscassagnol@icloud.com',
        password: 'PASSword',
    })
}; 

seedDatabase();