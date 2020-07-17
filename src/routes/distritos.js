const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

router.get('/', (req, res) => {
  mysqlConnection.query('SELECT idDistrito value, provincia, distrito label, costo FROM distrito where estado=1', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
}); 

router.get('/all', (req, res) => {
  mysqlConnection.query('SELECT idDistrito value, provincia, distrito label, costo, estado FROM distrito', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
}); 

router.post('/edit', (req, res) => {
    let {_id, costo} = req.body;
    let query = "update distrito set costo=? where idDistrito=?;";
    mysqlConnection.query(query, [costo,_id] ,(err, rows, fields) => {
        if(!err) {
        res.json({status: 200, message: 'Distrito Updated!'});
        } else {
        console.log(err);
        }
    });
});

module.exports = router;