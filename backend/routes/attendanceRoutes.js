const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { markAttendance } = require("../controllers/attendanceController");

const router = express.Router();

router.post("/", authMiddleware, markAttendance);

module.exports = router;