const Sequelize = require('sequelize');
const db = require('../database/db')

const Article = db.define(
    'Article',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
          type: Sequelize.STRING,
          allowNull: false,
        }  ,
        slug:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        body:{
            type: Sequelize.TEXT,
            allowNull: false,
        },
        categoryId:{
            type: Sequelize.INTEGER,
            allowNull: false,
        } 
    },
    {
        tableName: "article"
    }
)

module.exports = Article;