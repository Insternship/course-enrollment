const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");


const enrollStudent = async (studentName, courseId) => {
  
  const existingEnrollment = await Enrollment.findOne({
    studentName,
    course: courseId,
  });

  if (existingEnrollment) {
    throw new Error("Student already enrolled in this course");
  }

  
  const course = await Course.findOneAndUpdate(
    {
      _id: courseId,
      seatsRemaining: { $gt: 0 },
    },
    {
      $inc: { seatsRemaining: -1 },
    },
    {
      new: true,
    }
  );

  
  if (!course) {
    throw new Error("Course not found or no seats available");
  }

  
  const enrollment = await Enrollment.create({
    studentName,
    course: course._id,
    enrolledPrice: course.price,
  });

  return enrollment;
};


const getStudentCourses = async (studentName) => {
  return await Enrollment.find({ studentName }).populate("course");
};


const getAllEnrollments = async () => {
  return await Enrollment.find().populate("course");
};


const dropCourse = async (enrollmentId) => {
  const enrollment = await Enrollment.findById(enrollmentId);

  if (!enrollment) {
    throw new Error("Enrollment not found");
  }

  await Enrollment.findByIdAndDelete(enrollmentId);


  const course = await Course.findById(enrollment.course);


  if (course && course.seatsRemaining < course.totalSeats) {
    await Course.findByIdAndUpdate(enrollment.course, {
      $inc: { seatsRemaining: 1 },
    });
  }

  return enrollment;
};

module.exports = {
  enrollStudent,
  getStudentCourses,
  getAllEnrollments,
  dropCourse,
};