import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Student } from './Student';
import { port } from './config';
import { StudentArr } from './dummyData';

//load environment variables
dotenv.config();

//creating the server
const app = express();  

// built-in middleware to parse JSON data
app.use(express.json());


// global middleware set on the app itself
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

const studentValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('validating')

  const students = req.body

  const hasErrors = students.some((student: Student) => {
    
  
  const { name, grade } = student;

    if (!name)
    {
      res.status(400).send({ error: 'name is required' });
      return true;

    } else if (!grade)
    {
      res.status(400).send({ error: 'grade is required' });
      return true;

    } else if (typeof grade !== 'number') {
       res.status(400).send({ error: 'Grade must be a number' });
      return true
    } else
    {
      return false
    }
  });
  
  if (!hasErrors)
  { 
    next()
  }
}

 // middleware set specifically on the GET /students endpoint
// opton  1 to set middleware on /students
// app.use('/students', studentValidationMiddleware)

// route for fetching all students with optional filtering by grade
app.get('/students', (req: Request, res: Response) => {
  const gradeQuery = req.query.grade as string | undefined;
  let filteredStudents = StudentArr;

  if (gradeQuery) {
    const gradeNumber = Number(gradeQuery);
    // check if gradeNumber is a valid number
    if (!isNaN(gradeNumber)) {
      filteredStudents = StudentArr.filter(student => student.grade === gradeNumber);
    } else {
      // invalid grade value: return an empty array or an error)
      filteredStudents = [];
    }
  }

  res.json(filteredStudents);
});

app.get('/', (req, res) => {
  //accesing env in node
  res.send(process.env.CUSTOM_MESSAGE)
})

// route for fetching a student by ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const includeGrade = (req.query.includeGrade)

  const student = StudentArr.find(s => s.id === id);
  if (student)
  {
    if (includeGrade)
      {
      res.json(student);
    } else
    {
      const { grade, ...rest } = student
      res.json(rest)
      
    }
  } else {
    res.status(404).send('Student not found');
  }
});

// add a new student
//option 2 to set middleware on students directly on the get function
app.post('/students', studentValidationMiddleware, (req, res) => {
  console.log('Request body:', req.body); // log request body to verify input

  const studentsArray = req.body;

  const newStudents = studentsArray.map((student: Student, index: number) => {
    const { name, grade } = student;

    const lastStudent = StudentArr[StudentArr.length - 1];
    const lastStudentId = lastStudent ? lastStudent.id: 0;

    const newStudent: Student = {
      id: lastStudentId + index + 1,
      name,
      grade
    };
  
    return newStudent
  });

  StudentArr.push(...newStudents)

  res.status(201).json(newStudents);
});

// update a studentby ID
app.patch('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = StudentArr.findIndex(s => s.id === id);
  if (studentIndex >= 0) {
    const updatedStudent: Student = { id, ...req.body };
    // check grade is a number in the updated student object
    if (typeof updatedStudent.grade !== 'number') {
      return res.status(400).send('Grade must be a number');
    }
    StudentArr[studentIndex] = updatedStudent;
    res.json(updatedStudent);
  } else {
    res.status(404).send('Student not found');
  }
});

// delete a student by ID
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
