const modeloChecador ={
quieryObtenerChec: "SELECT * FROM checador",
quieryObtenerChecByeID: `SELECT * FROM checador WHERE ID = ?`,
quieryDeleteUsersByeID: `UPDATE checador SET Activo = 'N' WHERE ID = ?`,
quieryUsersExists: `SELECT nombre FROM Checador WHERE nombre = ?`,
quieryAgregaChec:`INSERT INTO checador (
    nombre,
    horarioEntrada,
    horarioSalida,
    aula,
    materia,
    carrera,
    grupo,
    Activo
    ) VALUES (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
    )`,
quieryObtenerChecInfo: `
SELECT nombre, horarioEntrada, horarioSalida, aula, materia, carrera, grupo
FROM checador
WHERE Nombre = ?
`}

const updatechecador=(
     nombre,
     horarioEntrada,
     horarioSalida,
     aula,
     materia,
     carrera,
     grupo

) => {
return `  
UPDATE checador SET
nombre = '${nombre}',
horarioEntrada = '${horarioEntrada}',
horarioSalida = '${horarioSalida}',
aula = '${aula}',
materia = '${materia}',
carrera = '${carrera}',
grupo = '${grupo}',  `
}

module.exports = {modeloChecador,updatechecador}