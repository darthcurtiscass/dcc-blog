const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Post extends Model {

}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,

        },
        date: {

        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },    
        user_id: {
            references: {
                model: 'user',
                key: 'id'
            }
        },
        
    },
    {
        sequelize,
        timestamps: false,
    }
)

module.exports = Post;