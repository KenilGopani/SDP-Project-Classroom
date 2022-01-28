const connectToMongo = require('./db');
const express = require('express');

const app = express()
const port = 4099
app.use(express.json())


// app.get('/', (req, res) => 
//     res.send("Hello Students ..")
// ),
// Here, Available Routes
app.use('/api/auth', require('./routes/auth')),
app.use('/api/classroom', require('./routes/classroom')),


app.listen(port, () => {
    console.log(`Classroom listening at http://localhost:${port}`)
})

connectToMongo();