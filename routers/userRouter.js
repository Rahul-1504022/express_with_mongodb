const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const bcrypt = require('bcrypt');


//Check user by email
const newUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send("User already exist!");
    }
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    if (user.password === "") {
        return res.status(400).send("Password cannot be null");
    }
    user.password = await bcrypt.hash(user.password, salt);
    try {
        const result = await user.save();
        const token = user.generateJWT();
        res.send({
            token: token,
            data: {
                name: result.name,
                email: result.email,
            }
        });
    } catch (error) {
        const errMsgs = [];
        for (field in error.errors) {
            errMsgs.push(error.errors[field].message);
        }
        console.log(error.message);
        return res.status(400).send(errMsgs);
    }
}

//Routing
router.route('/')
    .post(newUser);

module.exports = router;