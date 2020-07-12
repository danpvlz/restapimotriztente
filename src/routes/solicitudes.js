const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

router.post('/', (req,res)=>{
    let query = `
    SET SESSION group_concat_max_len = 1000000;
    select d.fecha date_time, DATE_FORMAT(d.fecha, '%d-%m-%Y') fecha, DATE_FORMAT(d.fecha,'%h:%i %p') hora, a.cliente, a.contacto,di.distrito, d.costo, a.estado, 
    CONCAT("[",GROUP_CONCAT(distinct '{"idfalla":',fv.idFalla,', "falla": "', fv.descripcion,'" , "costo": ',fv.costo,', "causa": "',fv.causa,'"}' order by fv.idFalla),"]") fallas_detalle, sum(fv.costo) reparacion, d.costo-sum(fv.costo) asistencia,
    a.gpsLat, a.gpsLong, a.referencia, a.idAuxilio
    from diagnostico d inner join 
    auxilio a on d.idDiagnostico=a.idDiagnostico inner join
    diagnosticodetalle dd on d.idDiagnostico=dd.idDiagnostico inner join
    fallavehicular fv on fv.idFalla = dd.idFalla inner join
    distrito di on d.distrito =di.idDistrito
    group by d.idDiagnostico
    order by 1 desc;`;
    mysqlConnection.query(query, (err, result)=>{
        if(!err){
            res.json({status: 200, data: result[1]});
        }else{console.log(err);}
    });
});

router.post('/actualizar-estado/', (req,res)=>{
    const {_id,state} = req.body;
    let estado = "";
    switch (state) {
        case 1:
            estado = "En camino";
            break;
        case 2:
            estado = "Atención exitosa";
            break;
        case 3:
            estado = "Cancelado";
            break;
        default:
            break;
    }
    let query = "update auxilio set estado=? where idAuxilio = ?;";
    mysqlConnection.query(query, [estado,_id] ,(err,result)=>{
        if(!err){
            res.json({status: 200, message: estado});
        }
    });
});

module.exports = router;