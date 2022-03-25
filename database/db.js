const Sequelize = require('sequelize')

let db = {}
    try { 
        db = new Sequelize('heroku_c9bd3125896c207', 'b9cd3df715efe2', '36db69b8',{
        dialect: "mysql",
        host:"us-cdbr-east-05.cleardb.net",
        port:3306,
        timezone: "-03:00"
})} catch(error){
    console.log(error)
}   

    async function hasConection () {
    try{
        await db.authenticate()
        console.log('Sucesso na conexão com o banco de dados!')
    } catch (error){
        console.error("Houve um erro!")
    }
}

Object.assign(db, {hasConection} )


module.exports = db;