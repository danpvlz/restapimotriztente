const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

router.post('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM usuario', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

router.post('/add', (req, res) => {
    let {user, clave, nombre, rol} = req.body;
    let query = "insert into usuario(user, clave, nombre, rol) values(?,md5(?),?,?);";
    mysqlConnection.query(query, [user,clave,nombre,rol] ,(err, rows, fields) => {
        if(!err) {
        res.json({status: 200, message: 'Usuario Added!'});
        } else {
        console.log(err);
        }
    });  
});

router.post('/edit', (req, res) => {
    let {_id, user, clave, nombre, rol} = req.body;
    let query = "update usuario set user=?, nombre=?, rol=? where idUsuario=?;";
    let parametros = [user,nombre,rol,_id];
    if(clave){
        query = "update usuario set user=?, clave=md5(?), nombre=?, rol=? where idUsuario=?;";
        parametros = [user,clave,nombre,rol,_id];
    }
    mysqlConnection.query(query, parametros ,(err, rows, fields) => {
        if(!err) {
        res.json({status: 200, message: 'Usuario Updated!'});
        } else {
        console.log(err);
        }
    });
});

router.post('/delete', (req, res) => {
    let {_id} = req.body;
    let query = "delete from usuario where idUsuario=?;";
    mysqlConnection.query(query, [_id] ,(err, rows, fields) => {
        if(!err) {
        res.json({status: 200, message: 'Usuario Deleted!'});
        } else {
        console.log(err);
        }
    });  
});

module.exports = router;