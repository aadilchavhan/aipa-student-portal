const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/aadil", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect", err));

// Schema & Model
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
const Student = mongoose.model("Student", studentSchema);

// Routes
app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  try {
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log (`Server running on http://localhost:${PORT}`));

