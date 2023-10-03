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
  if (employee === null)
    return `Employee (id: ${id}) doesn't exist in the system!`;
  await employeeModel.deleteOne({ _id: id });
  return `Employee (id: ${id}) is now deleted from the system!`;
};

// TODO Fix that only one shift can be added to an employee list!
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
    .findOneAndUpdate({ _id: id }, data).then(() => {
      return 'Shift added!'; 
    })
    .catch(err => {
      return `Updated employee's (id: ${id}) information in the system! ${err}`;
    });

    return response;
  
};

module.exports = {
  getAllEmployees,
  getEmployeeByID,
  deleteEmployeeByID,
  updateEmployeeByID,
};
