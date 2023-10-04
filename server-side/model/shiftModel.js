const mongoose = require("mongoose");

const schema = mongoose.Schema;

// Shift Schema

const shiftSchema = new schema({
  data: mongoose.Schema.Types.Date,
  startingHour: Number,
  endingHour: Number,
});

module.exports = mongoose.model("shift", shiftSchema, "shifts");
