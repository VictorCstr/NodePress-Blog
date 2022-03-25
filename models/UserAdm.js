const Sequelize = require('sequelize');
const db = require('../database/db')

const UserAdm = db.define(
    'UserAdm',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name:{
            type: Sequelize.STRING,
            allowNull: false,
        },  
        user_email:{
          type: Sequelize.STRING,
          allowNull: false,
        }  ,
        user_password:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "UserAdm"
    }
) 

module.exports = UserAdm;