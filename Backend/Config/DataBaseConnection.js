
const mongoose = require('mongoose');
require('dotenv').config()

const ConnectDb =  async ()=>{
    try {
        await mongoose.connect(process.env.DbString);
    }
    catch(error){
        console.log("Connection failed in mongoDb",error);
    }
}

module.exports =  ConnectDb