const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

module.exports.getDbConnection = function(){
    
    mongoose.connect(uri).then(()=>{
        console.log("Database Connected Successfully");
    })
    .catch((err:any)=>{
        console.log(err);
    })
}