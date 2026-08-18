const enrollmentService = require("../services/enrollmentService");

const enrollStudent = async (req, res, next) => {
  try {
    const { studentName, courseId } = req.body;

    if (!studentName || !courseId) {
      const error = new Error(
        "Student name and course ID are required"
      );
      error.statusCode = 400;
      throw error;
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
    next(error);
  }
};

const getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments =
      await enrollmentService.getAllEnrollments();

    res.status(200).json(enrollments);
  } catch (error) {
    next(error);
  }
};

const getStudentCourses = async (req, res, next) => {
  try {
    const { studentName } = req.params;

    const courses =
      await enrollmentService.getStudentCourses(studentName);

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const dropCourse = async (req, res, next) => {
  try {
    const enrollment =
      await enrollmentService.dropCourse(req.params.id);

    res.status(200).json({
      message: "Course dropped successfully",
      enrollment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  enrollStudent,
  getAllEnrollments,
  getStudentCourses,
  dropCourse,
};