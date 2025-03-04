import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
      console.log("📋 Students fetched successfully:", response.data);
    } catch (error) {
      console.error("❌ Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/students", formData);
      fetchStudents();
      setFormData({ name: "", email: "", age: "" });
      console.log("🎉 Student added successfully:", formData);
    } catch (error) {
      console.error("❌ Error adding student:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>📚  AIPA Student's Portal</h1>
      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>

      <h2>Student List</h2>
      {students.length > 0 ? (
        <ul className="student-list">
          {students.map((student) => (
            <li key={student._id} className="student-item">
              {student.name} ({student.email}), {student.age} years old
            </li>
          ))}
        </ul>
      ) : (
        <p>No students to display.</p>
      )}
    </div>
  );
};

export default App;
