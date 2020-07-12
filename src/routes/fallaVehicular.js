const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all fallas vehiculares
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM fallavehicular', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

router.post('/', (req, res) => {
  const {fallas} = req.body;
  mysqlConnection.query('select descripcion, costo, causa from fallavehicular where idFalla in (?)', [fallas],(err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

router.post('/edit', (req, res) => {
  const {_id, descripcion, costo,causa} = req.body;
  let query = "update fallavehicular set descripcion=?, causa=?, costo=? where idFalla=?";
  mysqlConnection.query(query, [descripcion,causa,costo,_id],(err, rows, fields) => {
    if(!err) {
      res.json({status: 200, message: 'Falla Updated!'});
    } else {
      console.log(err);
    }
  });  
});

module.exports = router;
