const express = require("express");
const { addEmployee } = require("../controllers/employeeController");

const router = express.Router();

router.post("/", addEmployee);

module.exports = router;