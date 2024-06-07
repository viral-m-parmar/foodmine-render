"use strict";
var mongoose = require("mongoose");
require("dotenv").config();
var uri = process.env.MONGO_URI;
module.exports.getDbConnection = function () {
    mongoose.connect(uri).then(function () {
        console.log("Database Connected Successfully");
    })
        .catch(function (err) {
        console.log(err);
    });
};
