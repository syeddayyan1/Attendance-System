const bcrypt = require("bcrypt");
const pool = require("../config/db");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");


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

// For Email login 

const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Employee ko email se find karo
    const result = await pool.query(
      "SELECT * FROM employees WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const employee = result.rows[0];

    // Password check
    const isPasswordValid = await bcrypt.compare(
      password,employee.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // JWT token
    const token = jwt.sign(
      {
        id: employee.id,
        email: employee.email,
        role: employee.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      employee: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {addEmployee,loginEmployee,};