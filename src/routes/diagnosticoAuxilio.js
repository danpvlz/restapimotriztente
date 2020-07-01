const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

router.post('/', (req, res) => {
  const {distrito, costo, fallas, lat,long,cliente,contacto,referencia} = req.body;
  const diagnostico_query = `
    insert into diagnostico 
    (fecha, distrito, costo)
    values
    (CURRENT_TIMESTAMP, ?, ?);
  `;
  mysqlConnection.query(diagnostico_query, [distrito, costo], (err, result, fields) => {
    if(!err) {
      var _id = result.insertId;
      const diagnosticodetalle_query = `
        insert into diagnosticodetalle 
        (idDiagnostico, idFalla)
        values
        (?, ?);
        `;
        fallas.forEach(falla_id => {
            mysqlConnection.query(diagnosticodetalle_query, [_id,falla_id]);
        });
      const auxilio_query = `
        insert into auxilio(gpsLat, gpsLong, cliente, contacto, estado, idDiagnostico, referencia)
        values(?,?,?,?,'PENDIENTE',?,?);
        `;
        mysqlConnection.query(auxilio_query, [lat,long,cliente,contacto,_id,referencia], (err, rows, fields) => {
        if(!err) {
            res.json({status: 200,message: 'Auxilio Saved'});
        } else {
            console.log(err);
        }
        });
    } else {
      console.log(err);
    }
  });

});

module.exports = router;
