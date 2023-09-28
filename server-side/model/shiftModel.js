const mongoose = require("mongoose");

const schema = mongoose.Schema;

// Shift Schema

const shiftSchema = new schema({
  _id: mongoose.Schema.Types.ObjectId,
  data: mongoose.Schema.Types.Date,
  startingHour: Number,
  endingHour: Number,
});

module.exports = mongoose.model("shift", shiftSchema, "shifts");
