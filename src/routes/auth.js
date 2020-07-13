const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

router.post('/', (req,res)=>{
    const {user, pass} = req.body;
    const query = "select idUsuario, nombre, rol from usuario where user=? and clave=md5(?)";
    mysqlConnection.query(query, [user,pass] , (err,result)=>{
        if(!err){
            res.json({status: 200, data: result});
        }console.log(err);
    });
});

module.exports = router;