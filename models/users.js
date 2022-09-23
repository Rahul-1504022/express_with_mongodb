const { model, Schema } = require("mongoose");
const jwt = require('jsonwebtoken');


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        null: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user",
    }
});

//use this type function call because we call property of  object in a function
userSchema.methods.generateJWT = function () {
    const token = jwt.sign({ //set payload
        _id: this._id,
        email: this.email,
        role: this.role,
    }, process.env.mySecretKey);
    return token;
}

const User = new model("User", userSchema);
module.exports.User = User; 