const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/courses", courseRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "Course Enrollment API is running",
  });
});


app.use(errorMiddleware);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${process.env.PORT || 5000}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });