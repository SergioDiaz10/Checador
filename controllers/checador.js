const { request, response } = require("express");
const pool = require("../db/connection")
const {modeloChecador, updatechecador} = require("../models/checador");

const ObtenerChec = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const users = await conn.query(modeloChecador.quieryObtenerChec, (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!users) {
            res.status(404).json({msg:"no se encontraron registros"})
            return
        }
        res.json({users})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const getUserByID = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.params

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const [user] = await conn.query(modeloChecador.quieryObtenerChecByeID, [id], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!user) {
            res.status(404).json({msg:`no se encontro registro con el id ${id}`})
            return
        }
        res.json({user})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const BorrarChec = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.query

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL USUARIO
        const {affectedRows} = await conn.query(modeloChecador.quieryDeleteUsersByeID, [id], (error) => {throw new Error(error) })
        
        //siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo eliminar el registro con el id ${id}`})
            return
        }
        res.json({msg: `El checador con id ${id} se elimino correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const AgregaChec = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const{
        nombre,
        horarioEntrada,
        horarioSalida,
        aula,
        materia,
        carrera,
        grupo,
        Activo
       
    } = req.body

    if (
        !nombre||
        !horarioEntrada||
        !horarioSalida||
        !aula||
        !materia||
        !carrera||
        !grupo||
        !Activo
       
    ){
        res.status(400).json({msg:"Falta informacion del checador"})
        return
    }
  
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        
        //tarea aqui que el checador no se duplique
       const [user] = await conn.query(modeloChecador.quieryUsersExists,[nombre])
       
        if(user){
            res.status(403).json({msg: `El checador ${nombre} ya se encuentra registrado`})
            return
        }
             //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA
        const {affectedRows} = await conn.query(modeloChecador.quieryAgregaChec, [
            nombre,
            horarioEntrada,
            horarioSalida,
            aula,
            materia,
            carrera,
            grupo,
            Activo
        ], (error) => {throw new Error(error)})         
        //siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo agregar el registro del checador ${nombre}`})
            return
        }
        res.json({msg: `El encaragado ${nombre} se agrego correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
        conn.end()
        }
    }
}

const updateUserByChecador = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {
        nombre,
        horarioEntrada,
        horarioSalida,
        aula,
        materia,
        carrera,
        grupo,
    } = req.body

    if (
        !nombre||
        !horarioEntrada||
        !horarioSalida||
        !aula||
        !materia||
        !carrera||
        !grupo
        
    ){
        res.status(400).json({msg:"Falta informacion del checador"})
        return
    }
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //tarea aqui que el checador no se duplique
       const [user] = await conn.query(modeloChecador.quieryObtenerChecInfo,[nombre])
       if (!user){
        res.status(403).json({msg: `El checador ${nombre} no se encuentra registrado`})
       }
        //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA
        //arreglar esta

        const {affectedRows} = await conn.query(updatechecador(
            nombre,
            horarioEntrada,
            horarioSalida,
            aula,
            materia,
            carrera,
            grupo
        )
            , (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo actualizar el registro del checador ${nombre}`})
            return
        }
        res.json({msg: `El checador ${nombre} se actualizo correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {ObtenerChec, getUserByID, BorrarChec, AgregaChec, updateUserByChecador}