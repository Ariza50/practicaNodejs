/**
 * Created by Ariz on 28/10/16.
 */

"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Usuario = mongoose.model('usuario');

var jwt = require('jsonwebtoken');

router.post('/login', function (req, res, next) {

    var idioma = req.query.lg;

    if ((idioma !=='es')&(idioma !== 'en')){
        next("you need to specify a valid language");
        return;
    }

    var user = req.body.user;
    var pwd = req.body.pwd;

    var sort = req.query.sort || null;
    var skip = parseInt(req.query.skip) || 0;

    var filter = {};

    if (typeof user !== 'undefined') {
        filter.nombre = user;
    }

    if (typeof pwd !== 'undefined') {
        filter.pwd = pwd;
    }

    Usuario.list(filter, sort, 1, skip)
        .then(function(usuario) {
            //res.json({success: true, usuario: usuario});

            if((usuario[0].nombre === user)&&(usuario[0].pwd === pwd)) {
                var token = jwt.sign({id: usuario[0].id}, '2341235435345345lakfldñldf', {
                    expiresIn: '2 days'
                });

                res.json({success: true, token: token});
            }else{
                if (idioma === 'es') {
                    next('No es correcto el user y/o el pwd');
                }
                if (idioma === 'en') {
                    next('User and/or password are wrong');
                }
            }
        }).catch(function (err) {
        if (idioma === 'es') {
            next('Error en la consulta de usuario');
        }
        if (idioma === 'en') {
            next('Error in user query');
        }
    });
});
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsImlhdCI6MTQ3NzgyMjk2NSwiZXhwIjoxNDc3OTk1NzY1fQ.yfePTp_JPGDL_oBdYQn0umealwob7Ypngqz3qG5dr6g

// crear un usuario
router.post('/', function(req, res, next) {

    var idioma = req.query.lg;

    if ((idioma !=='es')&(idioma !== 'en')){
        next("you need to specify a valid language");
        return;
    }

    var nUsuario = new Usuario(req.body);

    nUsuario.save(function(err, usuarioGuardado) {
        if (err) {
            if (idioma === 'es') {
                next("Error al guardar registro");
            }
            if (idioma === 'en') {
                next("Failed to save record");
            }
            return;
        }
        res.json({success: true, usuario: usuarioGuardado});
    });

});


module.exports = router;