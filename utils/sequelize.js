import mysql2 from "mysql2"
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(
    "gyakorlas",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql",
        dialectModule: mysql2,
        logging: false
    }
)

export default sequelize;