const express = require("express");
const {
  addEmployee,loginEmployee,} = require("../controllers/employeeController");

const router = express.Router();

router.post("/", addEmployee);

router.post("/login", loginEmployee);

module.exports = router;