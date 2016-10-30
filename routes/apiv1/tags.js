/**
 * Created by Ariz on 30/10/16.
 */

"use strict";


var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Tag = mongoose.model('tags');

var jwtAuth = require('../../library/jwtAuth');

router.use(jwtAuth());

// lista de tags
router.get('/', function(req, res, next) {

    var idioma = req.query.lg;

    if ((idioma !=='es')&(idioma !== 'en')){
        next("you need to specify a valid language");
        return;
    }

    var sort = req.query.sort || null;
    var limit = parseInt(req.query.limit) || null;
    var skip = parseInt(req.query.skip) || 0;

    var filter = {};

    Tag.list(filter, sort, limit, skip)
        .then(function(tags) {
            res.json({success: true, tags: tags});
        }).catch(function (err) {
        if (idioma === 'es') {
            next('Error en la consulta de los tags');
        }
        if (idioma === 'en') {
            next('Error in tags query');
        }
    });
});


module.exports = router;
