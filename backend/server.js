const express = require("express");
const cors = require("cors");
require("dotenv").config();
const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

require("./config/db");

app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
  res.send("Attendance API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});