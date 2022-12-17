const { request, response } = require("express");
const pool = require("../db/connection")
const {modelomaestros, updatemae} = require("../models/maestros");

const getUsers = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const users = await conn.query(modelomaestros.quieryGetMaestro, (error) => {throw new Error(error) })
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

const obtenerMaestro = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.params

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const [user] = await conn.query(modelomaestros.quieryObtenerMAestro, [id], (error) => {throw new Error(error) })
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

const borrarMaestro = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.query

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL maestros
        const {affectedRows} = await conn.query(modelomaestros.quieryBorrarMaestro, [id], (error) => {throw new Error(error) })
        
        //siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo eliminar el registro con el id ${id}`})
            return
        }
        res.json({msg: `El maestros con id ${id} se elimino correctamente.`})
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

const AgregarMaestro = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const{
        
        Nombre,
        aula,
        materia,
        carrera,
        grupo,
        Activo
       
    } = req.body

    if (
        
        !Nombre||
        !aula||
        !materia||
        !grupo||
        !Activo
       
    ){
        res.status(400).json({msg:"Falta informacion del maestros"})
        return
    }
  
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        
        //tarea aqui que el maestros no se duplique
       const [user] = await conn.query(modelomaestros.quieryUsersExists,[maestros],)
       
        if(!user){
            res.status(403).json({msg: `El maestros ${maestros} ya se encuentra registrado`})
            return
        }
  
       
       const salt = bcryptjs.genSaltSync()
       const grupoCifrada = bcryptjs.hashSync(grupo,salt)

       
        //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL maestros
        const {affectedRows} = await conn.query(modelomaestros.quieryAgregarMaestro, [
            Nombre,
            aula,
            materia,
            carrera,
            grupo,
            Activo
        ], (error) => {throw new Error(error)})
            //'${carrera || ''}',
        //siempre validar que no se obtuvieron resultados
       
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo agregar el registro del maestros ${maestros}`})
            return
        }
        res.json({msg: `El maestros ${maestros} se agrego correctamente.`})
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

const updateUserBymaestro = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {
        maestros,
        Nombre,
        aula,
        materia,
        carrera,
        grupo,
       
    } = req.body

    if (
        !maestros||
        !Nombre||
        !aula||
        !carrera||
        !materia||
        !grupo   
    ){
        res.status(400).json({msg:"Falta informacion del maestros"})
        return
    }

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()

        //tarea aqui que el maestros no se duplique
       const [user] = await conn.query(modelomaestros.quieryGetMaestroInfo,[maestros])

       if (!user){
        res.status(403).json({msg: `El maestros ${maestros} no se encuentra registrado`})
       }
        //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL maestros
        //arreglar esta
        const {affectedRows} = await conn.query(updatemae(
        Nombre,
        aula,
        materia,
        carrera,
        maestros              
        ),(error) => {throw new Error(error) })
            //'${carrera || ''}',
        //siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo actualizar el registro del maestros ${maestros}`})
            return
        }
        res.json({msg: `El maestros ${maestros} se actualizo correctamente.`})
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

module.exports = {getUsers, obtenerMaestro, borrarMaestro, AgregarMaestro, updateUserBymaestro}