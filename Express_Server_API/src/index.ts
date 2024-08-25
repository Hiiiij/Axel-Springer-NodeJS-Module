import express from 'express';
import dotenv from 'dotenv';
import { Student } from './Student';
import { port } from './config';
import { StudentArr } from './dummyData';


//initialize dotenv to load environment variables
dotenv.config();
const app = express();
// parsing json data
app.use(express.json()); 

// Get all students
app.get('/students', (req, res) => {
  res.json(StudentArr);
});

// Get student by ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = StudentArr.find(s => s.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
});

// Add a new student
app.post('/students', (req, res) => {
  console.log('Request body:', req.body); // Log request body to verify input

  const {name, grade} = req.body
  const newStudent: Student = {
    id: StudentArr.length + 1,
    name: req.body.name,
    grade: req.body.grade
  };

  StudentArr.push(newStudent);
  res.status(201).json(newStudent);
});


// Update a student by ID
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = StudentArr.findIndex(s => s.id === id);
  if (studentIndex >= 0) {
    const updatedStudent: Student = { id, ...req.body };
    StudentArr[studentIndex] = updatedStudent;
    res.json(updatedStudent);
  } else {
    res.status(404).send('Student not found');
  }
});

// Delete a student by ID
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = StudentArr.findIndex(s => s.id === id);
  if (studentIndex >= 0) {
    const deletedStudent = StudentArr.splice(studentIndex, 1);
    res.json(deletedStudent);
  } else {
    res.status(404).send('Student not found');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

