/**
 * Created by Ariz on 26/10/16.
 */

"use strict";


var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('anuncio');

var jwtAuth = require('../../library/jwtAuth');

router.use(jwtAuth());

// lista de anuncios
router.get('/', function(req, res, next) {

    var idioma = req.query.lg;

    var nombre = req.query.nombre;
    var venta = req.query.venta;
    var precio = req.query.precio;
    var tags = req.query.tags;

    var sort = req.query.sort || null;
    var limit = parseInt(req.query.limit) || null;
    var skip = parseInt(req.query.skip) || 0;

    var filter = {};

    if ((idioma !=='es')&(idioma !== 'en')){
        next("you need to specify a valid language");
        return;
    }

    if (typeof nombre !== 'undefined') {
        //Filtramos por el nombre entero o por parte de él. la opción "i" es para el caseInsensitive
        filter.nombre = {$regex: nombre, $options: 'i'};
    }

    if (typeof venta !== 'undefined') {
        filter.venta = venta;
    }

    if (typeof precio !== 'undefined') {
        var esArray = precio instanceof Array;
        if (!esArray) {
            filter.precio = precio;
        } else {
            // Esta linea de abajo funciona, pero me anula los demás filtros de nombre, etc.
            //filter = {$and: [{precio: {$gte:precio[0]}}, {precio: {$lte: precio[1]}}] };
            filter.precio = {$gte:precio[0], $lte: precio[1]};
        }

    }

    if (typeof tags !== 'undefined') {
        //filter = {tags: {$in: tags} };
        var esArray = tags instanceof Array;
        if (!esArray) {
            filter.tags = tags;
        }else{
            filter.tags = {$in: tags};
        }
    }

    Anuncio.list(filter, sort, limit, skip)
        .then(function(anuncios) {
            res.json({success: true, anuncios: anuncios});
        }).catch(function (err) {
        if (idioma === 'es') {
            next("Error en la búsqueda");
        }
        if (idioma === 'en') {
            next("Search Error");
        }
    });
});

// crear un anuncio
router.post('/', function(req, res, next) {

    var idioma = req.query.lg;

    if ((idioma !=='es')&(idioma !== 'en')){
        next("you need to specify a valid language");
        return;
    }

    var nAnuncio = new Anuncio(req.body);

    nAnuncio.save(function(err, anuncioGuardado) {
        if (err) {
            if (idioma === 'es') {
                next("Error al guardar registro");
            }
            if (idioma === 'en') {
                next("Failed to save record");
            }
            return;
        }
        res.json({success: true, anuncio: anuncioGuardado});
    });

});

module.exports = router;