const express = require("express");
const { NoteModel } = require("../model/note.model");
const { Auth } = require("../middlewares/authorization");
const noteRouter = express.Router();

noteRouter.use(Auth);

noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.json({ msg: "New note has been added", note: req.body });
  } catch (error) {
    res.json({ error: error.message });
  }
});

noteRouter.get("/", async (req, res) => {
  const { userID } = req.body;
  try {
    const user = await NoteModel.find({ userID: userID });
    res.status(200).json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const userIDinUserDoc = req.body.userID;

  try {
    const note = await NoteModel.findOne({ _id: noteID });
    const userIDinNoteDoc = note.userID;
    if (userIDinUserDoc == userIDinNoteDoc) {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.json({ msg: `${note.title} has been updates` });
    } else {
      res.json({ msg: "Not Authorized" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

noteRouter.delete("/delete/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const userIDinUserDoc = req.body.userID;

  try {
    const note = await NoteModel.findOne({ _id: noteID });
    const userIDinNoteDoc = note.userID;
    if (userIDinUserDoc == userIDinNoteDoc) {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.json({ msg: `${note.title} has been deleted` });
    } else {
      res.json({ msg: "Not Authorized" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = { noteRouter };
