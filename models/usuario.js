/**
 * Created by Ariz on 26/10/16.
 */

"use strict";

var mongoose = require('mongoose');

// defino el esquema de los usuarios
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    pwd: String
});

usuarioSchema.statics.list = function(filter, sort, limit, skip) {
    return new Promise(function (resolve, reject) {

        var query = usuario.find(filter);
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

var usuario = mongoose.model('usuario', usuarioSchema);