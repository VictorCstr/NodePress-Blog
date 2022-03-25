const Sequelize = require('sequelize');
const db = require('../database/db')

const Categories = db.define(
    'Categories',{
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
        } 
    }
)

module.exports = Categories;