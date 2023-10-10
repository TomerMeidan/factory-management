// Model imports
const employeeModel = require("../model/employeeModel");
const departmentModel = require("../model/departmentModel");
const shiftModel = require("../model/shiftModel");

// Get all shifts that exist in the system
const getAllShifts = async () => {
  try {
    return await shiftModel.find();
  } catch (err) {
    return err.message;
  }
};

// Add new shift to the system collection
const addShift = async (shiftData) => {
  try {
    const shift = new shiftModel(shiftData);
    await shift.save();
  } catch (err) {
    console.log(
      `ShiftBLL: addShift: Failed Adding new shift! errMessage:${err.message}`
    );
    return `Failed adding new shift!`;
  }
  console.log("ShiftBLL: addShift: New shift inserted!");
  return "New shift inserted!";
};

// Edit an existing shift from the system collection
const editShift = async (shiftID, shiftData) => {
  await shiftModel
    .findOneAndUpdate({ _id: shiftID }, shiftData)
    .then(() => {
      console.log(
        `ShiftBLL: editShift: Shift (id: ${shiftID}) information was updated in the system`
      );
      return `Shift (id: ${shiftID}) information was updated in the system`;
    })
    .catch((err) => {
      console.log(
        `ShiftBLL: editShift: Error updating shift's (id: ${id}) information in the system! errorMEssage:${err.message}`
      );
      return `Updated shift's (id: ${id}) information in the system! ${err}`;
    });
};

module.exports = { getAllShifts, addShift, editShift };
