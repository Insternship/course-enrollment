import { useEffect, useState } from "react";
import axios from "axios";
import "./MyCourses.css";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const studentName = "Najiya";

  const fetchMyCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/enrollments/${studentName}`
      );

      console.log("My Courses API Response:", response.data);

      setCourses(response.data);
    } catch (error) {
      console.error("API ERROR:", error);
      setError("Failed to load your courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDropCourse = async (enrollmentId) => {
    const confirmDrop = window.confirm(
      "Are you sure you want to drop this course?"
    );

    if (!confirmDrop) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/enrollments/${enrollmentId}`
      );

      alert("Course dropped successfully!");

      fetchMyCourses();
    } catch (error) {
      console.error("Drop course error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to drop course"
      );
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <h2 className="status">
        Loading your courses...
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
        You have not enrolled in any courses.
      </h2>
    );
  }

  return (
    <div className="my-courses-page">
      <h1>My Courses</h1>

      <div className="my-course-grid">
        {courses.map((enrollment) => {
          const course = enrollment.course;

          return (
            <div
              className="my-course-card"
              key={enrollment._id}
            >
              <h2>{course?.title}</h2>

              <p className="description">
                {course?.description}
              </p>

              <div className="course-info">
                <p>
                  <strong>Student:</strong>{" "}
                  {enrollment.studentName}
                </p>

                <p>
                  <strong>Instructor:</strong>{" "}
                  {course?.instructor}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {course?.duration}
                </p>

                <p>
                  <strong>Price:</strong> ₹
                  {enrollment.enrolledPrice}
                </p>
              </div>

              <button
                className="drop-btn"
                onClick={() =>
                  handleDropCourse(enrollment._id)
                }
              >
                Drop Course
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;