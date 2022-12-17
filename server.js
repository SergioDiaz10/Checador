const express = require('express')
const checadorRouter = require('./routes/checador')
const maestrosRouter = require('./routes/maestros')
const cors = require("cors")
class Server {
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT
        this.paths = {
            checador:"/api/v1/checador ",
            maestros:"/api/v1/maestros"
        }
        this.middlewares()
        this.routes()
    }
    routes() {
    this.app.use(this.paths.checador, checadorRouter)
    this.app.use(this.paths.maestros, maestrosRouter)
    }
middlewares(){
this.app.use(cors())
this.app.use(express.json())
}
    listen(){
        this.app.listen(this.PORT, () => {
            console.log('servidor corriendo en el puerto ', this.PORT);
        
        })
    }
}

module.exports = Server