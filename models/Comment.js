const { Comment, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Comment extends Model {

}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
        post_id: {
            references: {
                model: 'post',
                key: 'id'
            }
        }
        
    },
    {
        sequelize,
        timestamps: false,
    }
)

module.exports = Post;