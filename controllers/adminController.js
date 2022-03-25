const UserAdm = require('../models/UserAdm')
const bcrypt = require('bcrypt')
const { use } = require('../routes')

const adminController = {
    returnPage: (req,res) =>{
        res.render('admin/login&register')
    },
    returnAdminList: (req,res) =>{
        UserAdm.findAll().then( users =>{
            res.render('admin/adminList', {users})
        })
    },
    createAdmin: async (req,res) =>{
        let {user_name, user_email, user_password, user_autorization} = req.body
        let Autorization = "Administrador do Blog"
        if (user_autorization == Autorization){
        const passHash = await bcrypt.hash(user_password, 10)
           await UserAdm.findOne({
                where: {user_email}
            }).then( user =>{
                if(user == undefined){
                     UserAdm.create({
                        user_name,
                        user_email,
                        user_password : passHash
                    }).then( () => {
                        res.redirect('/admin/list')
                    })
                }else{
                    res.redirect('/admin')
                }
            })
        } else{
            res.send('Autorização Incorreta!')
        }
    },
    loginAdmin: async (req,res) =>{
        let {user_email, user_password} = req.body

        await UserAdm.findOne({
            where: {user_email}
        }) .then( user =>{
            if(user != undefined){
                let checkPass = bcrypt.compareSync(user_password, user.user_password)
                
                if(checkPass){
                    req.session.user ={
                        id: user.user_id,
                        user_name : user.user_name,
                        user_email: user.user_email
                    }
                    res.redirect('/admin/categories')
                }else{
                    res.redirect('/admin')
                }
            }else{
                res.redirect('/admin')
            }
        })
    },
    logoutAdmin: async (req,res) => {
        req.session.destroy( ()=>{
            res.redirect('/admin');
        })
 
    }

}

module.exports = adminController