const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Comment extends Model {

}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,

        },
        date: {
            type: DataTypes.STRING,
            defaultValue: new Date().getMonth() + 1 + "/" + new Date().getDate() + "/" + new Date().getFullYear()
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },    
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'comment',
        timestamps: false,
        freezeTableName: true,
    }
)

module.exports = Comment;