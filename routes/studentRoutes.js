const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// POST - Add a new student
router.post("/", async (req, res) => {
  try {
    const { name, rollNumber, department, year } = req.body;

    // Basic validation
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

module.exports = router;
