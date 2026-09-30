const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { markAttendance , markDayOut , getRecord} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/day-in", authMiddleware, markAttendance);
router.post("/day-out", authMiddleware, markDayOut);
router.get("/record", authMiddleware, getRecord);

module.exports = router;