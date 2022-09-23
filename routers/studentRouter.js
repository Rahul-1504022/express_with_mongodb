const express = require('express');
const router = express.Router();
const { Student } = require('../models/students');
const authorize = require('../middlewares/authorize');
const admin = require("../middlewares/admin");

const studentList = async (req, res) => {

    try {
        const readStudent = await Student.find();
        res.send(readStudent);
        console.log(readStudent);
    } catch (error) {
        res.send(error.message);
        console.log(error.message);
    }
};

const newStudent = async (req, res) => {

    const student = new Student(req.body);
    try {
        const result = await student.save();
        res.send(result);
    } catch (error) {
        const errMsgs = [];
        for (field in error.errors) {
            errMsgs.push(error.errors[field].message);
        }
        console.log(error.message);
        return res.status(400).send(errMsgs);
    }

};

const studentDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(400).send("Id not found!");
        }
        res.send(student);
    } catch (error) {
        return res.status(400).send("Id not found!");
    }

};

const studentUpdate = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.updateOne({ _id: id }, {
            $set: {
                name: "Asma Khatun"
            }
        });
        return res.send("Updated Successfully!");
    } catch (error) {
        return res.status(400).send(error.message);
    }

};

const studentDelete = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.deleteOne({ _id: id });
        console.log(student);
        return res.send("Id deleted Successfully!");
    } catch {
        return res.status(400).send("Id cannot delete!");
    }

};

router.route('/')
    .get(studentList)
    .post(newStudent);

router.route('/:id')
    .get(studentDetail)
    .put(studentUpdate)
    .delete([authorize, admin], studentDelete);

module.exports = router;