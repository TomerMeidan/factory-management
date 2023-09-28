const express = require("express");
const employeesRouter = express.Router();
const employeesBLL = require('../BLL/employeesBLL')


// Entry Point: localhost:port/employees

// TODO implement edit handler to edit an existing employee's information

// TODO implement new handler to add a new employee to the system

// TODO implement get handler to get all employees data (Full name, Department and his shifts)

employeesRouter.get('/', async (req,res) => {
    const employees = await employeesBLL.getAllEmployees();
    res.status(201).send(employees);
})


module.exports = employeesRouter;
