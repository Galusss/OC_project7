const Sequelize = require("sequelize")
const db = require("../config/db")

const Articles = db.sequelize.define(
    'articles', {
        article_id: {
            type: Sequelize.SMALLINT,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.SMALLINT
        },
        article_name: {
            type: Sequelize.TEXT
        },
        article_description: {
            type: Sequelize.TEXT
        },
        url_article: {
            type: Sequelize.TEXT
        },
        source_article: {
            type: Sequelize.TEXT
        },
        date_publication: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, 
    {
        timestamps: false
    }
)


module.exports = Articles;