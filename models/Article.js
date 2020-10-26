const Sequelize = require("sequelize")
const db = require("../config/db")

const Article = db.sequelize.define(
    'articles', {
        article_id: {
            type: Sequelize.SMALLINT,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.SMALLINT,
        },
        articleName: {
            type: Sequelize.STRING
        },
        article_description: {
            type: Sequelize.TEXT
        },
        source_article: {
            type: Sequelize.STRING,
          
        },
        date_publication: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        lastnameAuthor: {
            type: Sequelize.STRING
        },
        firstnameAuthor: {
            type: Sequelize.STRING
        }
    }, 
    {
        timestamps: false
    }
)


module.exports = Article;