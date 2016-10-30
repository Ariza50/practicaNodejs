/**
 * Created by Ariz on 30/10/16.
 */

"use strict";

var mongoose = require('mongoose');

// defino el esquema de los tags
var tagsSchema = mongoose.Schema({
    nombre: String
});

tagsSchema.statics.list = function(nombreTag, sort, limit, skip) {
    return new Promise(function (resolve, reject) {

        var query = tags.find(nombreTag);
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

var tags = mongoose.model('tags', tagsSchema);