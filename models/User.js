const Sequelize = require("sequelize")
const db = require("../config/db")

const User = db.sequelize.define(
    'users', {
        id: {
            type: Sequelize.SMALLINT,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
            },
        nom: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        date_inscription: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, 
    {
        timestamps: false
    }
)


module.exports = User;