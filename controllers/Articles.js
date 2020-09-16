const Article = require('../models/Article')



// get all article
exports.getAllArticle = function (req, res) {
    Article.findAll()
    .then(article => {
        if(article.length === 0) {
            res.json({
                status: 'No article found'
            })
            res.send(err)
        }else {
            res.json(article)
        }
    })
};


// get one article with id
exports.getOneArticle = function (req, res) {
    Article.findOne({
        where: {
            article_id: req.params.id
        }
    })
    .then(article => {
        if(!article) {
            res.json({
                status: 'Article not found'
            })
            res.send(err)
        }else {
            res.json(article)
        }
    })
};


// create
exports.create = function (req, res) {
    const today = new Date()
    const articleData = {
        userId: req.body.userId,
        article_name: req.body.article_name,
        article_description: req.body.article_description,
        url_article: req.body.url_article,
        source_article: req.body.source_article,
        date_publication: today
    }
    Article.findOne({
        where: {
            article_name: req.body.article_name
        }
    })
    .then(article => {
        if (!article) {
            Article.create(articleData)
            .then(article => {
                res.json(article)
            })
            .catch(err => {
                res.send('error: ' + err)
            })    
        }else {
            res.json({
                error: 'Article name already exists'
            })
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
};


// update article with id
exports.update = function (req, res) {
    Article.findOne({
        where: {
            userId: req.params.id
        }
    })
    .then(async article => {
        if (!article) {
            res.json({
                status: 'Article not updated'
            })
            throw Error('Article not updated');
        }else {
            article.url_article = req.body.url_article,
            article.source_article = req.body.source_article,
            article.article_name = req.body.article_name,
            article.article_description = req.body.article_description,
            await article.save();
            res.json(article)
        }
    })
};


// delete article with id
exports.delete = function (req, res) {
    Article.findOne({
        where: {
            userId: req.params.id
        }
    })
    .then(async article => {
        if (!article) {
            res.json({
                status: 'Article not deleted'
            })
            throw Error('Article not deleted')
        }else {
            await article.destroy()
            res.json({
                status: 'Article successfully deleted'
            })
        }
    })
};