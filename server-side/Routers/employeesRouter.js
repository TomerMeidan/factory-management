const express = require("express");
const employeesRouter = express.Router();
const employeesBLL = require("../BLL/employeesBLL");

// Main Entry Point: localhost:port/employees

// Action: GET
// Entry Point: localhost:port/employees/edit/:id
// Info: Obtain requested employee's information for edit
employeesRouter.get("/edit/:id", async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await employeesBLL.getEmployeeByID(req.params.id);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(404).send(err.name);
  }
});

// TODO Action: PUT
// Entry Point: localhost:port/employees/edit/:id
// Info: Update an employee with new information
employeesRouter.put("/edit/:id", async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await employeesBLL.updateEmployeeByID(req.params.id, req.body);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(404).json("Invalid data was entered!");
  }
});

// Action: DELETE
// Entry Point: localhost:port/employees/edit/:id
// Info: Delete requested employee from mongo db by _id field
employeesRouter.delete("/edit/:id", async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await employeesBLL.deleteEmployeeByID(req.params.id);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(404).send(err.name);
  }
});

// TODO Action: POST
// Entry Point: localhost:port/employees/new
// Info: Create new employee and send it to the mongo db

// Action: GET
// Entry Point: localhost:port/employees
// Info: Get all employees data (Full name, Department and his shifts)
employeesRouter.get("/", async (req, res) => {
  const employees = await employeesBLL.getAllEmployees();
  res.status(201).send(employees);
});

module.exports = employeesRouter;
