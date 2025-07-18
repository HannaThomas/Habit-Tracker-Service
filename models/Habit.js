const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { type: String, required: true },
  checked: { type: Boolean, default: false },
  note: { type: String, default: '' }

});

const Habit = mongoose.model("Habit", habitSchema, "habitCollection");

module.exports = Habit;