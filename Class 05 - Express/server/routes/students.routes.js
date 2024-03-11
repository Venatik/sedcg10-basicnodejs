import express from 'express';
import {
    getStudents,
    getStudentById,
    addStudent,
    deleteStudent,
    updateStudent
} from '../services/students.service.js';

const router = express.Router();

// Main route - localhost:3000/api/students

// GET ALL STUDENTS
router.get("/students", (req, res) => {
    const queryData = req.query;
    try {
        const students = getStudents(queryData);
        res.send(students);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get("/students/:id", (req, res) => {
    const studentId = req.params.id;
    try {
        const student = getStudentById(studentId);
        res.status(200).send(student);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post("/students", (req, res) => {
    const newStudentData = req.body;
    try {
        const createdStudent = addStudent(newStudentData);
        res.status(201).send(createdStudent); // 201 = Created
    } catch (error) {
        res.sendStatus(500).send(error.message);
        // res.status(500).send("Internal server error.");
    }
});

// PUT - updates the whole entry with the provided data
// PATCH - updates only the provided fields
router.patch("/students/:id", (req, res) => {
    const studentId = req.params.id;
    const studentUpdates = req.body;
    try {
        const updatedStudent = updateStudent(studentId, studentUpdates);
        res.status(200).send(updatedStudent);
    } catch (error) {
        if (error.message === "ID cannot be updated.") {
            res.status(400).send(error.message);
        } else if (error.message === "Student not found.") {
            res.status(404).send(error.message);
        } else {
            res.sendStatus(500);
        }
    }
});

router.delete("/students/:id", (req, res) => {
    const studentId = req.params.id;
    try {
        deleteStudent(studentId);
        res.status(200).json({ deleted: true });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

export { router };