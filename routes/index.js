const express = require('express')
const routes = express.Router()

const auth = require('../middlewares/auth')
const ArticleController = require('../controllers/ArticleController')
const CategoriesController = require('../controllers/CategoriesController')
const homeController = require('../controllers/homeController')
const adminController = require('../controllers/adminController')

routes.get('/', homeController.returnHomePage)
routes.get('/page/:num', homeController.pages)
routes.get('/categories/:slug', homeController.articleByCategory)
routes.get('/article/:slug' , homeController.articlePage)
routes.post('/article/', ArticleController.returnArticleByName)

routes.get('/admin' , adminController.returnPage)
routes.post('/admin' , adminController.loginAdmin)
routes.get('/admin/logout', adminController.logoutAdmin)
routes.get('/admin/list', auth, adminController.returnAdminList)
routes.post('/admin/register', adminController.createAdmin)


routes.get('/admin/categories', auth, CategoriesController.listItens)
routes.get('/admin/categories/edit/:id', auth, CategoriesController.returnUpdateCategory)
routes.post('/admin/categories/edit/:id',  auth,CategoriesController.updateCategory)

routes.post('/admin/categories/delete',auth, CategoriesController.DeleteCategories)

routes.get('/admin/categories/register' ,auth, CategoriesController.returnRegisterPage)
routes.post('/admin/categories/register', auth, CategoriesController.RegisterCategories)



routes.get('/admin/articles' , auth, ArticleController.listItens)

routes.get('/admin/articles/edit/:id' ,auth, ArticleController.returnArticleUpdatePage)
routes.post('/admin/articles/edit/:id' , auth, ArticleController.updateArticle )

routes.post('/admin/articles/delete' , auth, ArticleController.DeleteCategories)

routes.get('/admin/articles/register' , auth, ArticleController.returnRegisterArticlePage)
routes.post('/admin/articles/register' , auth, ArticleController.registerArticle)






module.exports = routes;