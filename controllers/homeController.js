const {Categories , Article } = require('../models/index')
const slugify = require('slugify')

const HomeController = {
    returnHomePage: (req,res) => {
        Article.findAll({
            order: [['updatedAt', 'DESC']],
            include: Categories,
            limit: 4
        })
        .then ( article => 
            Categories.findAll().then( category => {
                res.render('index' , {article, category})
             } ) )   
    },
    articlePage: (req,res) => {
        let slug = req.params.slug
        Article.findOne({
            where: { slug }
        }).then( article => {
            if(slug != undefined){
            Categories.findAll().then( category => {
                res.render('articles/oneArticle' , {article,category} )     
        })} else{
            res.redirect('/')
        } }) .catch(err => {
            res.redirect('/')
        })
    },
    articleByCategory: (req,res) => {
        let slug = req.params.slug
        Categories.findOne({
            where: { slug },
            include: Article
        }).then( category => {
            //Find ALL abaixo é para preencher todas as categorias e aproveitar a mesma view index para renderizar por categoria
                Categories.findAll().then(categories => {
                    res.render('index' , {category:categories , article: category.Articles} )  
                })                
        }) .catch(err => {
            res.redirect('/')
        })
    },
    pages: (req,res) => {
        let page = req.params.num
        let offset;
        let limit = 4;

        if(isNaN(page) || page == 1){
            offset = 0
        }else{
            offset = (parseInt(page) -1 ) * limit
        }

        Article.findAndCountAll({
            limit,
            offset,
            order: [['id', 'DESC']]
        }).then( articles => {
            let next;

            if(offset + limit >= articles.count){
                next = false
            } else{
                next = true
            }

            let result = {
                page: parseInt(page),
                next,
                articles
            }

        Categories.findAll().then( category =>{
            res.render('articles/pages', {category, result})
        })
        })
        
    }
}





module.exports = HomeController;