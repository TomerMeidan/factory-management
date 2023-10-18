const express = require("express");
const departmentsRouter = express.Router();
const departmentsBLL = require("../BLL/departmentsBLL");

// Main Entry Point: localhost:port/departments

// Action: GET
// Entry Point: localhost:port/departments/getPage/departments
departmentsRouter.get('/getPage/departments', (req,res) => {
  res.render("departments/departments.html")
})

// Action: GET
// Entry Point: localhost:port/departments/getPage/edit-department
departmentsRouter.get('/getPage/edit-department', (req,res) => {
  res.render("departments/edit-department.html")
})

// Action: GET
// Entry Point: localhost:port/departments/getPage/new-department
departmentsRouter.get('/getPage/new-department', (req,res) => {
  res.render("departments/new-department.html")
})

// Action: GET
// Entry Point: localhost:port/departments/edit/:id
// Info: Obtain requested department's information for edit
departmentsRouter.get("/edit/:id", async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await departmentsBLL.getDepartmentByID(req.params.id);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(404).send(err.name);
  }
});

// Action: PUT
// Entry Point: localhost:port/departments/edit/:id
// Info: Update a department with new information
departmentsRouter.put("/edit/:id", async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await departmentsBLL.updateDepartmentByID(req.params.id, req.body);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(404).json("Invalid data was entered!");
  }
});

// Action: DELETE
// Entry Point: localhost:port/departments/edit/:id
// Info: Delete requested department from collection by id field
departmentsRouter.delete("/edit/:id", async (req, res) => {
  let responseMessage = null;
  try {
    responseMessage = await departmentsBLL.deleteDepartmentByID(req.params.id);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(501).send(err.name);
  }
});

// Action: POST
// Entry Point: localhost:port/departments/new
// Info: Create new department and send it to the mongo db
departmentsRouter.post("/new", async (req,res) => {
  let responseMessage = null;
  try {
    responseMessage = await departmentsBLL.addDepartment(req.body);
    return res.status(201).json(responseMessage);
  } catch (err) {
    return res.status(501).send(err.name);
  }
})

// Action: GET
// Entry Point: localhost:port/departments
// Info: Get all departments including (manager, list of employees)
departmentsRouter.get("/", async (req, res) => {
  const departments = await departmentsBLL.getAllDepartments();
  res.status(201).send(departments);
});

module.exports = departmentsRouter;
