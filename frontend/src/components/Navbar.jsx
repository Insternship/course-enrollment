import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>📚 Course Enrollment</h2>

      <div className="nav-links">
        <Link to="/">Courses</Link>
        <Link to="/my-courses">My Courses</Link>
      </div>
    </nav>
  );
};

export default Navbar;