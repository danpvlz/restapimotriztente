const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// get auxilios
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM auxilio', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// INSERT An Employee
router.post('/', (req, res) => {
  const {lat,long,cliente,contacto,diagnostico,referencia} = req.body;
  const query = `
    insert into auxilio(gpsLat, gpsLong, cliente, contacto, estado, idDiagnostico, referencia)
    values(?,?,?,?,'PENDIENTE',?,?);
  `;
  mysqlConnection.query(query, [lat,long,cliente,contacto,diagnostico,referencia], (err, rows, fields) => {
    if(!err) {
      res.json({status: 200,message: 'Auxilio Saved'});
    } else {
      console.log(err);
    }
  });

});

module.exports = router;
