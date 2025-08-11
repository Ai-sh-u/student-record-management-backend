const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
});

// POST - Add a new student
router.post("/", async (req, res) => {
  try {
    const { name, rollNumber, department, year } = req.body;
    if (!name || !rollNumber || !department || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const student = new Student({ name, rollNumber, department, year });
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Error saving student:", error);
    res.status(500).json({ message: "Error saving student", error: error.message });
  }
});

// DELETE a student
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student", error: error.message });
  }
});

module.exports = router;
