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

export { router };