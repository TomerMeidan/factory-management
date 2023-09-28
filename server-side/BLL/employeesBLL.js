// Model imports
const employeeModel = require("../model/employeeModel");
const departmentModel = require("../model/departmentModel");
const shiftModel = require("../model/shiftModel");

// Get all employees with department and shift list

const getAllEmployees = async () => {
  const employees = await employeeModel
    .find()
    .populate("departmentID")
    .populate("shifts");
  return employees;
};

module.exports = { getAllEmployees };
