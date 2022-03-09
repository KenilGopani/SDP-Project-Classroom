const mongoose = require('mongoose');
const credential = require('./emailPassword')

// For local mongoDB storage 
// const URI = "mongodb://localhost:27017/Classroom?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// const connectToMongo = () => {

//     mongoose.connect(URI,()=>{
//         console.log("Connected to Mongo!");
//     })
// }

// for mongoDB Atlas.
const AtlasURI = `mongodb+srv://klassroom0246:${credential.mongoDBPass}@cluster0.sqqbw.mongodb.net/KlassroomDB?retryWrites=true&w=majority`;
const connectToMongo = () => {

    mongoose.connect(AtlasURI,{
        // useNewUrlParser : true,
        // useCreateIndex: true,
        // useUnifiedTopology : true,
        // useFindAndModify: false
    }).then(()=>{
        console.log("Connected to Mongo!");
    }).catch((err)=> console.log(err))
}

module.exports = connectToMongo;