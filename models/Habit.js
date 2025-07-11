const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  text: { type: String, required: true },
  icon: { type: String, required: true },
  checked: { type: Boolean, default: false }
});

const Habit = mongoose.model("Habit", habitSchema, "habitCollection");

module.exports = Habit;