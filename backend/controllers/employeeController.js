const bcrypt = require("bcrypt");
const pool = require("../config/db");
const sendEmail = require("../utils/sendEmail");

const addEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO employees (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    // Employee database mein save hone ke baad email jayegi
    await sendEmail(email, name, password);

    res.status(201).json({
      message: "Employee added successfully",
    });
  }
  
 catch (error) {
  console.log(error);

  res.status(500).json({
    message: error.message,
  });
}
};

module.exports = { addEmployee };