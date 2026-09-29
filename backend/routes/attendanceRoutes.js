const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { markAttendance , markDayOut } = require("../controllers/attendanceController");

const router = express.Router();

router.post("/day-in", authMiddleware, markAttendance);
router.post("/day-out", authMiddleware, markDayOut);


module.exports = router;