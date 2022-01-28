const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/Classroom?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {

    mongoose.connect(URI,()=>{
        console.log("Connected to Mongo!");
    })
}

module.exports = connectToMongo;