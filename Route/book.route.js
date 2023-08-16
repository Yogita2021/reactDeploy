const express = require("express");
const { Book } = require("../model/book.model");

const bookRouter = express.Router();

bookRouter.post("/add", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(200).json({ msg: "book added!", book: book });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

bookRouter.get("/", async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json({ msg: "all books here", book: book });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

bookRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    res.status(200).json({ msg: "book deleted successfuly" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
module.exports = { bookRouter };
