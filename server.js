const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });
const app = require('./app');
//console.log(app.get('env')); //set by express
//console.log(process.env); //set by node

//connect with MongoDB
const { connect } = require('mongoose');
connect('mongodb://localhost:27017/my-student-2')
    .then(() => console.log("Connect to MONGO-DB!"))
    .catch((error) => console.log("MONGO-DB connection failed!"));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
});