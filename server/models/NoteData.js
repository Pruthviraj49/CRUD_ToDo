const mongoose = require("mongoose");
const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    desp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NoteData = mongoose.model("notes", NotesSchema);
module.exports = NoteData;
