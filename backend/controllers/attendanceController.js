const pool = require("../config/db");

const markAttendance = async (req, res) => {
  try {
    const employeeId = req.user.id;

    // Employee ki details nikalna
    const result = await pool.query(
      "SELECT name, email FROM employees WHERE id = $1",
      [employeeId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const employee = result.rows[0];

    const now = new Date();

    // Date
    const date = now.toISOString().split("T")[0];

    // Time
    const time = now.toTimeString().split(" ")[0];

    await pool.query(
      `INSERT INTO attendance
       (employee_id, name, email, date, time, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        employeeId,
        employee.name,
        employee.email,
        date,
        time,
        "Present",
      ]
    );

    res.status(201).json({
      message: "Attendance marked successfully",
    });
  } catch (error) {
    console.log(error);

    if (error.code === "23505") {
      return res.status(400).json({
        message: "Attendance already marked for today",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {markAttendance,};