// Model imports
const employeeModel = require("../model/employeeModel");
const departmentModel = require("../model/departmentModel");
const shiftModel = require("../model/shiftModel");

// Get all employees with department and shift list
const getAllShifts = async () => {
    const shifts = await shiftModel
      .find()
    return shifts;
  };

  module.exports = {getAllShifts};  