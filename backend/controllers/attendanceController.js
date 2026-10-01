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

// Day Out
const markDayOut = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const now = new Date();

    const date = now.toISOString().split("T")[0];
    const logoutTime = now.toTimeString().split(" ")[0];

    const result = await pool.query(
      `UPDATE attendance
       SET logout_time = $1
       WHERE employee_id = $2
       AND date = $3
       AND logout_time IS NULL
       RETURNING *`,
      [logoutTime, employeeId, date]
    );

   
    if (result.rows.length === 0) {

      const checkAttendance = await pool.query(
        `SELECT logout_time
         FROM attendance
         WHERE employee_id = $1
         AND date = $2`,
        [employeeId, date]
      );

      // Aaj ki attendance hi nahi mili
      if (checkAttendance.rows.length === 0) {
        return res.status(404).json({
          message: "Day In attendance not found for today",
        });
      }

      // Attendance hai aur logout_time bhi already hai
      if (checkAttendance.rows[0].logout_time) {
        return res.status(400).json({
          message: "Day-Out already marked for today",
        });
      }

      return res.status(400).json({
        message: "Day-Out could not be marked",
      });
    }

    return res.status(200).json({
      message: "Day Out marked successfully",
      logoutTime: result.rows[0].logout_time,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// get record

const getRecord = async (req, res) => {
  try {
    const employeeId = req.user.id;

    // const result = await pool.query(
    //   `SELECT * FROM attendance
    //    WHERE employee_id = $1
    //    AND date >= DATE_TRUNC('month', CURRENT_DATE)
    //    AND date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    //    ORDER BY date ASC`,
    //   [employeeId]
    // );

      const result = await pool.query(
      `SELECT * FROM attendance
       WHERE employee_id = $1
       ORDER BY date DESC`,
      [employeeId]
      );

    res.status(200).json(result.rows);  
  }
  
  catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {markAttendance,markDayOut,getRecord,};
