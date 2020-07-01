const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// INSERT An Employee
router.post('/', (req, res) => {
  const {distrito, costo, fallas} = req.body;
  
  const query = `
    insert into diagnostico 
    (fecha, distrito, costo)
    values
    (CURRENT_TIMESTAMP, ?, ?);
  `;
  
  mysqlConnection.query(query, [distrito, costo], (err, result, fields) => {
    if(!err) {
      let _id = result.insertId;
      const diagnosticodetalle_query = `
        insert into diagnosticodetalle 
        (idDiagnostico, idFalla)
        values
        (?, ?);
        `;
        fallas.forEach(falla_id => {
            mysqlConnection.query(diagnosticodetalle_query, [_id,falla_id]);
        });
     
      res.json({status: 'Diagnostico Saved!', insertedId: _id});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;

/*

mysqlConnection.query(query, [distrito, costo], (err, result, fields) => {
    if(!err) {
      res.json({status: 'Diagnostico Saved!', insertedId: result.insertId});
    } else {
      console.log(err);
    }
  });
*/