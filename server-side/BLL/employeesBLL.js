// Model imports
const employeeModel = require("../model/employeeModel");
const departmentModel = require("../model/departmentModel");
const shiftModel = require("../model/shiftModel");

// Get employee with department and shift list (by ID)
const getEmployeeByID = async (id) => {
  const employee = await employeeModel
    .findById(id)
    .populate("departmentID")
    .populate("shifts");
  return employee;
};
// Get all employees with department and shift list
const getAllEmployees = async () => {
  const employees = await employeeModel
    .find()
    .populate("departmentID")
    .populate("shifts");
  return employees;
};

// Delete an employee by his id field in the employees collection
const deleteEmployeeByID = async (id) => {
  const employee = await getEmployeeByID(id);
  if (employee === null) {
    console.log(
      `EmployeesBLL: deleteEmployeeByID: The employee (id: ${id}) doesn't exist in the system!`
    );
    return `The employee (id: ${id}) doesn't exist in the system!`;
  }
  await employeeModel.deleteOne({ _id: id });
  console.log(
    `EmployeesBLL: deleteEmployeeByID: The employee (id: ${id}) is deleted from the system!`
  );
  return `The employee is deleted from the system!`;
};

// TODO Fix that only one shift can be added
// Update an employee by his id field in the employees collection
const updateEmployeeByID = async (id, data) => {
  let department = null;
  try {
    department = await departmentModel.find({ name: data.departmentName });
  } catch (err) {
    return err.message;
  }
  data["departmentID"] = department[0]._id;

  const response = await employeeModel
    .findOneAndUpdate({ _id: id }, data)
    .then(() => {
      return "Shift added!";
    })
    .catch((err) => {
      console.log(
        `EmployeeBLL: updateEmployeeByID: Error updating employee's (id: ${id}) information in the system! errorMEssage:${err.message}`
      );
      return `Updated employee's (id: ${id}) information in the system! ${err}`;
    });

  return response;
};

const addEmployee = async (employeeData) => {
  let department = null;
  try {
    department = await departmentModel.find({
      name: employeeData.departmentName,
    });
    employeeData["departmentID"] = department[0]._id;
  } catch (err) {
    console.log(
      `EmployeeBLL: addEmployee: Error finding given department by user, errorMessage:${err.message}`
    );
    return "There is an error in the department field!";
  }

  try {
    const employee = new employeeModel(employeeData);
    await employee.save();
  } catch (err) {
    console.log(
      `EmployeeBLL: addEmployee: Failed Adding new employee! errMessage:${err.message}`
    );
    return `Failed adding new employee!`;
  }
  console.log("EmployeeBLL: addEmployee: New employee inserted!");
  return "New employee inserted!";
};

const getAllEmployeesNotInDepartment = async (departmentID) => {

  const notInDepartment = { departmentID: { $ne: departmentID } };
  // Filter employees not in the Sales department
  const employees = await employeeModel.find({departmentID: notInDepartment.departmentID})

  return employees;
};

module.exports = {
  getAllEmployees,
  getEmployeeByID,
  deleteEmployeeByID,
  updateEmployeeByID,
  addEmployee,
  getAllEmployeesNotInDepartment,
};
