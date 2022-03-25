const {Categories , Article } = require('../models/index')
const slugify = require('slugify')

const CategoriesController = {
    listItens :  (req,res) => {
         Categories.findAll(
             {order:[
            ['id', 'ASC']
        ]}).then(category => {
            res.render('categories/categoriesPage' , {category})
        }) 
    },
    returnRegisterPage: (req,res) => {
        res.render('categories/registerPage')
    },
    RegisterCategories: (req,res) => {
        let title = req.body.title;
        if(title != undefined && title != ""){
            Categories.create({
                title,
                slug: slugify(title)
            }) .then( () => {
                res.redirect('/admin/categories')})
        } else{
            res.redirect('/admin/categories/register')
        }
    },
    returnUpdateCategory: (req,res) => {
        let id = req.params.id;
        if(isNaN(id)){
            res.redirect('/admin/categories')
        }
          Categories.findByPk(id).then( category => {
          if(id != undefined){    
                res.render('categories/editPage' , {category})
                }
            else{
               res.redirect('/admin/categories')
           }})
    },
    updateCategory: (req,res) => {
        let id = req.body.id
        let title = req.body.title
        Categories.update(
            {title, slug: (slugify(title))},
            { where: {id}})
        .then( () => {
            res.redirect('/admin/categories')
        })
    },
    DeleteCategories: (req,res) => {
        let id = req.body.id;
        if(id != undefined){
           if(!isNaN(id)){
                Categories.destroy({
                    where: {id}
                }).then( () => {
                    res.redirect('/admin/categories')
                })
           } else{
               res.redirect('/admin/categories')
           }
        } else{
            res.redirect('/admin/categories')
        }
    },
}




module.exports = CategoriesController;