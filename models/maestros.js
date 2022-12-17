const modelomaestros ={

quieryGetMaestro: "SELECT * FROM maestros",
quieryObtenerMAestro: `SELECT * FROM maestros WHERE ID = ?`,
quieryBorrarMaestro: `UPDATE maestros SET Activo = 'N' WHERE ID = ?`,
quieryUsersExists: `SELECT Nombre FROM maestros WHERE TRAS = "?"`,
quieryAgregarMaestro:`INSERT INTO maestros (
    nombre,
    aula,
    materia,
    carrera,
    grupo,
    numero,
    Activo
    ) VALUES (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?)
    `,
    quieryGetMaestroInfo: `
SELECT maestro, Nombre, aula, materia, carrera, numero
 FROM maestros 
 WHERE MAESTRO = ?`
}
const updatemae= (
Nombre,
aula,
materia,
carrera,
numero

) => {
    return `
    UPDATE maestros SET
    aula = '${aula}',
    materia = '${materia}',
    carrera ='${carrera}',
    numero = '${numero}',
    WHERE Nombre = '${Nombre}'
    `
}

module.exports = {modelomaestros, updatemae}