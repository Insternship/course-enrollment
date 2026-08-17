# Course Enrollment System

A MERN stack mini project for managing courses and student enrollments.

Students can:

* View available courses
* Check seat availability
* Enroll in courses
* View their enrolled courses
* Drop enrolled courses

---

## Features

### Courses Page

* View all available courses
* View course title and description
* View instructor
* View course duration
* View course price
* View total seats
* View remaining seats
* Enroll in a course
* Enroll button is disabled when the course is full

### My Courses Page

* View all courses enrolled by the student
* View student name
* View instructor
* View course duration
* View enrolled price
* Drop a course
* Dropping a course makes the seat available again

---

## Backend Features

* Full CRUD operations for courses
* Create a course
* Get all courses
* Get a single course
* Update a course
* Delete a course
* Enroll students
* Get student's enrolled courses
* Drop courses
* Input validation
* Error handling
* MongoDB database
* Mongoose
* REST API
* Controllers, Services, Routes and Models structure

---

## Concurrency Handling

One of the main challenges in this project is handling multiple students trying to enroll in the last available seat at the same time.

### Example

Suppose a course has only **1 seat remaining**:

```text
Course has 1 seat remaining

Student A → Enroll
Student B → Enroll
```

Only one student should successfully get the last seat.

This is handled using MongoDB's atomic `findOneAndUpdate()` operation.

The course is updated only when a seat is available:

```javascript
{
  _id: courseId,
  seatsRemaining: { $gt: 0 }
}
```

The seat is then decreased atomically:

```javascript
{
  $inc: { seatsRemaining: -1 }
}
```

This ensures that:

* Only one student can get the last available seat
* `seatsRemaining` never becomes negative
* Two simultaneous enrollment requests cannot take the same seat

---

## Price Handling

The price at the time of enrollment is stored in the `Enrollment` document as `enrolledPrice`.

This means that if the course price changes later, the enrolled student's original price remains unchanged.

---

## Technologies Used

### Frontend

| Technology   | Purpose                          |
| ------------ | -------------------------------- |
| React.js     | User interface                   |
| Vite         | Frontend development environment |
| Axios        | API requests                     |
| React Router | Page navigation                  |
| CSS          | Styling                          |

### Backend

| Technology | Purpose         |
| ---------- | --------------- |
| Node.js    | Backend runtime |
| Express.js | REST API        |
| MongoDB    | Database        |
| Mongoose   | MongoDB ODM     |

### Tools

* Visual Studio Code
* Postman
* Git
* GitHub
* MongoDB Atlas

---

## Project Structure

```text
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
│   ├── package-lock.json
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
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── CSS files
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

### Backend Folder Responsibilities

**Controllers**

Handle incoming requests and send responses to the client.

* `courseController.js`
* `enrollmentController.js`

**Models**

Define the MongoDB data structure using Mongoose.

* `Course.js`
* `Enrollment.js`

**Routes**

Define the API endpoints and connect them to controllers.

* `courseRoutes.js`
* `enrollmentRoutes.js`

**Services**

Contain the main business logic of the application.

* `courseService.js`
* `enrollmentService.js`

**server.js**

Initializes Express, middleware, routes and MongoDB connection.

---

## API Endpoints

### Course Endpoints

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/courses`     | Create a new course |
| GET    | `/api/courses`     | Get all courses     |
| GET    | `/api/courses/:id` | Get a single course |
| PUT    | `/api/courses/:id` | Update a course     |
| DELETE | `/api/courses/:id` | Delete a course     |

### Enrollment Endpoints

| Method | Endpoint                        | Description                    |
| ------ | ------------------------------- | ------------------------------ |
| POST   | `/api/enrollments`              | Enroll a student               |
| GET    | `/api/enrollments/:studentName` | Get student's enrolled courses |
| DELETE | `/api/enrollments/:id`          | Drop a course                  |

---

## Data Models

### Course Model

```text
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
```

### Enrollment Model

```text
Enrollment
│
├── studentName
├── course
├── enrolledPrice
├── enrolledAt
├── createdAt
└── updatedAt
```

---

## Error Handling

The application handles errors such as:

* Course not found
* Enrollment not found
* Student already enrolled
* No seats available
* Invalid input
* Invalid course ID
* Database errors

The server returns appropriate HTTP status codes and error messages.

The application also handles invalid requests without stopping the server.

---

## How to Run the Project

### Prerequisites

Make sure the following are installed:

* Node.js
* MongoDB Atlas account
* Git
* Postman

---

### Backend Setup

Open the terminal and navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Start the backend server:

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

---

### Frontend Setup

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will usually run on:

```text
http://localhost:5173
```

---


## Project Status

The Course Enrollment System is completed with:

* Course management
* Course CRUD operations
* Student enrollment
* My Courses page
* Course dropping
* Seat availability management
* Concurrency handling
* Input validation
* Error handling
* REST API
* MongoDB database integration

---

## Conclusion

This project demonstrates a complete MERN stack application with a structured backend architecture, REST APIs, MongoDB integration, student enrollment functionality and concurrency-safe seat management.
