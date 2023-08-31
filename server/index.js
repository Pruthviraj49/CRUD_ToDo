const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const NotesModel = require("./models/NoteData");
app.use(express.json());
app.use(cors());

async function connectToMongoDB() {
  try {
    const connectionString = process.env.MONGODB_URI;
    await mongoose.connect(connectionString, { useNewUrlParser: true });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

connectToMongoDB();

app.post("/insert", async (req, res) => {
  const title = req.body.title;
  const desp = req.body.desp;

  const note = new NotesModel({
    title: title,
    desp: desp,
  });

  try {
    await note.save();
    res.send("Inserted Data");
  } catch (e) {
    console.log(e);
  }
});

app.get("/read", async (req, res) => {
  try {
    const result = await NotesModel.find({});
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await NotesModel.findByIdAndRemove(id).exec();
  res.send("Deleted");
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { title, desp } = req.body;

  try {
    const updatedNote = await NotesModel.findByIdAndUpdate(id, {
      title: title,
      desp: desp,
    });

    if (!updatedNote) {
      return res.status(404).send("Item not found.");
    }

    res.status(200).send("Item updated successfully.");
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("An error occurred while updating the item.");
  }
});

app.listen(3001, () => {
  console.log("Sever is running on port 3001");
});
