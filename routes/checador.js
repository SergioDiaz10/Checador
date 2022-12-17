const {Router} = require("express")
const {ObtenerChec, getUserByID, BorrarChec, AgregaChec, updateUserByChecador} = require("../controllers/checador")
const router = Router()
//http://localhost:4000/api/v1/clc2/id/2
//http://localhost:4000/api/v1/clc2?id=1
//GET
router.get("/", ObtenerChec)

router.get("/id/:id", getUserByID)
//DELETE
router.delete("/", BorrarChec)
//POST
router.post("/", AgregaChec)
//put
router.put("/", updateUserByChecador)
module.exports = router