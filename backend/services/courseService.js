const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const getCourses = async () => {
  return await Course.find();
};

const getCourseById = async (courseId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
};

const createCourse = async (courseData) => {
  const course = await Course.create({
    ...courseData,
    seatsRemaining: courseData.totalSeats,
  });

  return course;
};

const deleteCourse = async (courseId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  await Enrollment.deleteMany({
    course: courseId,
  });

 
  await Course.findByIdAndDelete(courseId);

  return course;
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourse,
};