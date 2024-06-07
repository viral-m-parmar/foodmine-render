const mongoose = require("mongoose");
require('dotenv').config();


module.exports.getDbConnection = function(){
    
    mongoose.connect('mongodb+srv://ViralParmar:drinkeatfun@cluster0.epzdxij.mongodb.net/drinkeatfun?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
        console.log("Database Connected Successfully");
    })
    .catch((err:any)=>{
        console.log(err);
    })
}