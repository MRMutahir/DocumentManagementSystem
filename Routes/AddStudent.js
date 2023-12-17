// routes/studentRoutes.js
import express from "express";
import { addStudents, getAllStudents } from "../Controler/AddStudent.js";

const addStudentrouter = express.Router();

// Route to add a student
addStudentrouter.post("/Students", addStudents);

// Route to get all students
addStudentrouter.get("/getAllStudents", getAllStudents);

export { addStudentrouter };
