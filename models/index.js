const Article = require('./Article');
const Categories = require('./Categories');


Article.belongsTo(Categories, {foreignKey: "categoryId"});

Categories.hasMany(Article, {foreignKey: "categoryId"});

module.exports = { Article, Categories } ;