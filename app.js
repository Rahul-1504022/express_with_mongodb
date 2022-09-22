const express = require('express');
const app = express();
const studentRouter = require('./routers/studentRouter');
const morgan = require('morgan');
const userRouter = require('./routers/userRouter')
const authRouter = require('./routers/authRouter')



app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}


app.use('/api/students', studentRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send("Hello from express js!");
});

module.exports = app;
