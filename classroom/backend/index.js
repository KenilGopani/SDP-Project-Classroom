const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const app = express()
const port = 4099

app.use(cors());
app.use(express.json())

// app.get('/', (req, res) => 
//     res.send("Hello Students ..")
// ),
// Here, Available Routes
app.use('/api/auth', require('./routes/authRoute')),
app.use('/api/classroom', require('./routes/classroomRoute')),
app.use('/api/assignment', require('./routes/assignmentRoute'))
app.use('/api/admin', require('./routes/adminRoute'))

app.listen(port, () => {
    console.log(`Classroom listening at http://localhost:${port}`)
})

connectToMongo();