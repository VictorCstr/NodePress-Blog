const slugify = require('slugify')
const { Categories , Article } = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const ArticleController = {
    returnRegisterArticlePage: (req,res) => {
        Categories.findAll().then( category => {
            res.render('articles/registerArticlePage' , {category})
        })
    },
    registerArticle: (req,res) => {
      let title = req.body.title 
      let body = req.body.body
      let category = req.body.category
        Article.create({
            title,
            slug: slugify(title),
            body,
            categoryId : category
        }).then( () => {
            res.redirect('/admin/articles')
        })
    },
    listItens :  (req,res) => {
        Article.findAll(
            {order:[ ['id', 'DESC'] ],
             include: Categories}
        ).then( (article) => {
           res.render('articles/articlespage' , {article})
       }) 
   },
   DeleteCategories: (req,res) => {
    let id = req.body.id;
    if(id != undefined){
       if(!isNaN(id)){
            Article.destroy({
                where: {id}
            }).then( () => {
                res.redirect('/admin/articles')
            })
       } else{
           res.redirect('/admin/articles')
       }
    } else{
        res.redirect('/admin/articles')
    }
    },
    returnArticleUpdatePage: (req,res) => {
        let id = req.params.id
        Article.findOne({
            where: {id}
        }).then( article => {
            Categories.findAll().then( categories =>{
                res.render('articles/editArticle' , {article, categories})
            })    
        })
    },
    updateArticle: (req,res) => {
        let id = req.params.id
        let {title,body,category} = req.body
        Article.update({
            title,
            slug: slugify(title),
            body,
            categoryId: category
        },
            {where: {id}
        }).then( category => {
            res.redirect('/admin/articles')
        })
    },
    returnArticleByName : async (req,res) =>{   
        let article = req.body.article
        await Article.findAll({ 
            where: { 
                title: { 
                    [Op.like] : `%${article}%` }},
            raw:true
        })      
        .then( article => {
            //Find ALL abaixo é para preencher todas as categorias e aproveitar a mesma view index para renderizar por categoria
                 Categories.findAll().then(categories => {
                        res.render('index' , {category: categories , article} )  
                    })     
        })
    }
}




module.exports = ArticleController;