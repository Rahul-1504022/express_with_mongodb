//import mongoose
const { Schema, model } = require('mongoose');

//define Schema (like property of Table in mySql)
//then create a model(like Table creation in mySql)
const Student = model('Student', Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 0 },
    hobbies: {
        type: Array,
        of: String,
        validate: {
            validator: (value) => value.length > 0,
            message: "There must be at least 1 hobby!"
        }
    }
}));

exports.Student = Student;