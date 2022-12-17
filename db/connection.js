const mariadb = require("mariadb")

const config = {
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port: process.env.DB_PORT,
conectionLimit: process.env.DB_CONT_LIMIT,
}

const pool = mariadb.createPool(config)

module.exports =pool