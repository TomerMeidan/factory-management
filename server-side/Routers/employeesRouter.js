const express = require("express");
const employeesRouter = express.Router();
const employeesBLL = require("../BLL/employeesBLL");

// Entry Point: localhost:port/employees

// TODO implement edit handler to edit an existing employee's information
employeesRouter.get("/edit/:id", async (req, res) => {
    let employee = null;
  try {
    employee = await employeesBLL.getEmployeeByID(req.params.id);
  } catch (err) {
    return res.status(404).send(err.name);
  }
  res.status(201).send(employee);
});

// TODO implement post edit to mongodb here


// TODO implement new handler to add a new employee to the system

// Get Handler: Get all employees data (Full name, Department and his shifts)
employeesRouter.get("/", async (req, res) => {
  const employees = await employeesBLL.getAllEmployees();
  res.status(201).send(employees);
});

module.exports = employeesRouter;
