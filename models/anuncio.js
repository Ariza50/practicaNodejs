/**
 * Created by Ariz on 26/10/16.
 */

"use strict";

var mongoose = require('mongoose');

// defino el esquema de los anuncios
var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: Array
});

anuncioSchema.statics.list = function(filter, sort, limit, skip) {
    return new Promise(function (resolve, reject) {

        var query = anuncio.find(filter);
        query.sort(sort);
        query.limit(limit);
        query.skip(skip);
        query.exec(function (err, result) {
            if (err){
                reject(err);
                return
            }
            resolve(result);
        });
    });
};

var anuncio = mongoose.model('anuncio', anuncioSchema);