const {Router} = require("express")
const {getUsers, obtenerMaestro, borrarMaestro, AgregarMaestro, updateUserBymaestro} = require("../controllers/maestros")
const router = Router()

//http://localhost:4000/api/v1/usuarios
//http://localhost:4000/api/v1/usuarios/id/2
//http://localhost:4000/api/v1/usuarios?id=1
//GET
router.get("/", getUsers)
//lo siguiente despues de //id es el identificador que esta declarado en controllers (la constante)
router.get("/id/:id", obtenerMaestro)
//DELETE
router.delete("/", borrarMaestro)
//POST
router.post("/", AgregarMaestro)
//put
router.put("/", updateUserBymaestro)


module.exports = router