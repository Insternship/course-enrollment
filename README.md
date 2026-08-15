# Course Enrollment System

A MERN stack mini project for managing courses and student enrollments.
Students can view available courses, check seat availability, enroll in courses, view their enrolled courses, and drop courses.

## Features
### Courses Page

- View all available courses
- View course title and description
- View instructor
- View course duration
- View course price
- View total seats
- View remaining seats
- Enroll in a course
- Enroll button is disabled when the course is full

### My Courses Page

- View all courses enrolled by the student
- View student name
- View instructor
- View duration
- View enrolled price
- Drop a course
- Dropping a course makes the seat available again

## Backend Features

- Full CRUD operations for courses
- Create course
- Get all courses
- Get a single course
- Update course
- Delete course
- Enroll students
- Get student's enrolled courses
- Drop courses
- Input validation
- Error handling
- MongoDB database
- Mongoose
- REST API
- Routes, Controllers, Services and Models folder structure

## Concurrency Handling

The main challenge in this project is when two students try to enroll in the last available seat at the same time.

For example:

text
Course has 1 seat remaining

Student A → Enroll
Student B → Enroll

Only one student should get the last seat.

This is handled using MongoDB's atomic findOneAndUpdate() operation.

The course is updated only when a seat is available:

{
  _id: courseId,
  seatsRemaining: { $gt: 0 }
}

The seat is then decreased atomically:

{
  $inc: { seatsRemaining: -1 }
}

This prevents two students from successfully taking the same last seat and prevents seatsRemaining from becoming negative.

-- Price Handling

The price at the time of enrollment is stored in the Enrollment document as enrolledPrice.

-- Technologies Used

Frontend         Backend

React.js         Node.js
Vite             Express.js
Axios            MongoDB    
CSS              Mongoose
React Router

Tools
Visual Studio Code
Postman
Git
GitHub
MongoDB Atlas

-- Project Structure

course-enrollment/
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── courseController.js
│   │   └── enrollmentController.js
│   │
│   ├── models/
│   │   ├── Course.js
│   │   └── Enrollment.js
│   │
│   ├── routes/
│   │   ├── courseRoutes.js
│   │   └── enrollmentRoutes.js
│   │
│   ├── services/
│   │   ├── courseService.js
│   │   └── enrollmentService.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── pages/
│   │   │   ├── Courses.jsx
│   │   │   └── MyCourses.jsx
│   │   │
│   │   ├── components/
|   |   ├── Navbar.jsx 
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── CSS files
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

-- API Endpoints

Course Endpoints

Method	 Endpoint	          Description
POST  	 /api/courses	      Create a new course
GET	     /api/courses	      Get all courses
GET	     /api/courses/:id	  Get a single course
PUT	     /api/courses/:id	  Update a course
DELETE	 /api/courses/:id	  Delete a course
 
Enrollment Endpoints

Method	 Endpoint	          Description
POST	 /api/enrollments	  Enroll a student
GET	     /api/enrollments/:   studentName	Get student's courses
DELETE	 /api/enrollments/:id Drop a course

-- Data Models

Course Model

Course
│
├── title
├── description
├── instructor
├── price
├── duration
├── totalSeats
├── seatsRemaining
├── createdAt
└── updatedAt 

Enrollment Model 

Enrollment
│
├── studentName
├── course
├── enrolledPrice
├── enrolledAt
├── createdAt
└── updatedAt

-- Error Handling

The application handles errors such as:

Course not found
Enrollment not found
Student already enrolled
No seats available
Invalid input
Invalid course ID
Database errors

The server returns appropriate HTTP status codes and error messages.
The server should continue running even when an invalid request is sent.

-- How to Run the Project
Prerequisites

Make sure the following are installed:
Node.js
MongoDB Atlas account
Git
Postman

-- Backend Setup

Open the terminal and go to the backend folder:
cd backend
Install dependencies:
npm install
Create a .env file inside the backend folder.
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
Start the backend server:
node server.js
The backend will run on:
http://localhost:5000

-- Frontend Setup

Open another terminal.
Go to the frontend folder:
cd frontend
Install dependencies:
npm install
Start the development server:
npm run dev
The frontend will run on the Vite development URL, usually:
http://localhost:5173