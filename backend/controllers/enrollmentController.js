const enrollmentService = require("../services/enrollmentService");

const enrollStudent = async (req, res) => {
  try {
    const { studentName, courseId } = req.body;

    if (!studentName || !courseId) {
      return res.status(400).json({
        message: "Student name and course ID are required",
      });
    }

    const enrollment = await enrollmentService.enrollStudent(
      studentName,
      courseId
    );

    res.status(201).json({
      message: "Course enrolled successfully",
      enrollment,
    });
  } catch (error) {
    if (error.message === "Course not found or no seats available") {
      return res.status(409).json({
        message: error.message,
      });
    }

    if (error.message === "Student already enrolled in this course") {
      return res.status(409).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to enroll in course",
      error: error.message,
    });
  }
};

const getAllEnrollments = async (req, res) => {
  try {
    const enrollments =
      await enrollmentService.getAllEnrollments();

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch enrollments",
      error: error.message,
    });
  }
};

const getStudentCourses = async (req, res) => {
  try {
    const { studentName } = req.params;

    const courses =
      await enrollmentService.getStudentCourses(studentName);

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch enrolled courses",
      error: error.message,
    });
  }
};

const dropCourse = async (req, res) => {
  try {
    const enrollment =
      await enrollmentService.dropCourse(req.params.id);

    res.status(200).json({
      message: "Course dropped successfully",
      enrollment,
    });
  } catch (error) {
    if (error.message === "Enrollment not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to drop course",
      error: error.message,
    });
  }
};

module.exports = {
  enrollStudent,
  getAllEnrollments,
  getStudentCourses,
  dropCourse,
};