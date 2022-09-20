const express = require('express');
const app = express();
const studentRouter = require('./routers/studentRouter');
const morgan = require('morgan');

//connect with MongoDB
const { connect } = require('mongoose');
connect('mongodb://localhost:27017/my-student-2')
    .then(() => console.log("Connect to MONGO-DB!"))
    .catch((error) => console.log("MONGO-DB connection failed!"));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/students', studentRouter);

app.get('/', (req, res) => {
    res.send("Hello from express js!");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
});

// Mongoose -> Model -> Collection
// Import Model
// Connect Database