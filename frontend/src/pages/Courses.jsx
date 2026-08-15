import { useEffect, useState } from "react";
import axios from "axios";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/courses"
      );

      console.log("Courses API Response:", response.data);

      setCourses(response.data);
    } catch (error) {
      console.error("API ERROR:", error);
      console.error("STATUS:", error.response?.status);

      console.log(
        "SERVER RESPONSE:",
        JSON.stringify(error.response?.data, null, 2)
      );

      setError(
        error.response?.data?.message ||
          "Failed to load courses"
      );
    } finally {
      setLoading(false);
    }
  };

  
  const handleEnroll = async (courseId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/enrollments",
        {
          studentName: "Najiya",
          courseId: courseId,
        }
      );

      console.log(
        "Enrollment successful:",
        response.data
      );

      alert("Course enrolled successfully!");

      
      await fetchCourses();
    } catch (error) {
      console.error("Enrollment error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to enroll in course"
      );
    }
  };

  
  useEffect(() => {
    fetchCourses();
  }, []);

  
  if (loading) {
    return (
      <h2 className="status">
        Loading courses...
      </h2>
    );
  }

  
  if (error) {
    return (
      <h2 className="status error">
        {error}
      </h2>
    );
  }

  
  if (courses.length === 0) {
    return (
      <h2 className="status">
        No courses available
      </h2>
    );
  }

  return (
    <div className="courses-page">
      <h1>Available Courses</h1>

      <div className="course-grid">
        {courses.map((course) => (
          <div
            className="course-card"
            key={course._id}
          >
            <h2>{course.title}</h2>

            <p className="description">
              {course.description}
            </p>

            <div className="course-info">
              <p>
                <strong>Instructor:</strong>{" "}
                {course.instructor}
              </p>

              <p>
                <strong>Duration:</strong>{" "}
                {course.duration}
              </p>

              <p>
                <strong>Price:</strong> ₹
                {course.price}
              </p>

              <p>
                <strong>Total Seats:</strong>{" "}
                {course.totalSeats}
              </p>

              <p>
                <strong>Seats Remaining:</strong>{" "}
                {course.seatsRemaining}
              </p>
            </div>

            <button
              className="enroll-btn"
              disabled={course.seatsRemaining === 0}
              onClick={() =>
                handleEnroll(course._id)
              }
            >
              {course.seatsRemaining === 0
                ? "Full"
                : "Enroll"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;