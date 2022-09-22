const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
//const jwt = require('jsonwebtoken');

const authUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("User not found!");
    }
    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) {
        return res.status(400).send("User not found!");
    }
    const token = user.generateJWT();
    res.send({ token: token });

}

router.route('/')
    .post(authUser);

module.exports = router;