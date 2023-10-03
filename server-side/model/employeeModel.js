const mongoose = require("mongoose");

const schema = mongoose.Schema;

// Employee Schema

const employeeSchema = new schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
    },
    shifts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shift",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { versionKey: false }
);

employeeSchema.index({ shifts: 1 }, { unique: true });

module.exports = mongoose.model("employee", employeeSchema, "employees");
