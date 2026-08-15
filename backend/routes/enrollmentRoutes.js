const express = require("express");

const {
  enrollStudent,
  getAllEnrollments,
  getStudentCourses,
  dropCourse,
} = require("../controllers/enrollmentController");

const router = express.Router();

router.post("/", enrollStudent);

router.get("/", getAllEnrollments);

router.get("/:studentName", getStudentCourses);

router.delete("/:id", dropCourse);

module.exports = router;