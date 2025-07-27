const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/habitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello, habit queen 🌟");
});

const Habit = require("./models/Habit");

// Get all habits
app.get("/habits", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch habits" });
  }
});

// Add a new habit
app.post("/habits", async (req, res) => {
  try {
    const { text, category, checked, note } = req.body;

    const newHabit = new Habit({
      text,
      category,
      checked,
      note
    });

    const savedHabit = await newHabit.save();
    res.status(201).json(savedHabit);
  } catch (err) {
    console.error("Error saving habit:", err);
    res.status(500).json({ message: "Failed to save habit" });
  }
});

// Toggle habit checked status and add note
app.patch("/habits/:id", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    if(req.body.hasOwnProperty("checked")){
      habit.checked=req.body.checked;
    }
    if(req.body.hasOwnProperty("note")){
      habit.note=req.body.note;
    }
    const updated = await habit.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update habit" });
  }
});

// Delete a habit
app.delete("/habits/:id", async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete habit" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
