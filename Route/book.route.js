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

bookRouter.get("/get", async (req, res) => {
  const { sortBy, filterBy, title, page, limit } = req.query;
  const sort = sortBy === "asc" ? 1 : -1;
  try {
    if (page && limit) {
      let skipCount = (page - 1) * limit;
      const books = await Book.find().skip(skipCount).limit(limit);
      return res.status(200).send({
        isError: false,
        data: books,
      });
    }
    if (!sortBy && !filterBy && !title) {
      const books = await Book.find();
      return res.status(200).send({
        isError: false,
        data: books,
      });
    }
    if (!sortBy && !title) {
      const books = await Book.find({ genre: filterBy });
      return res.status(200).send({
        isError: false,
        data: books,
      });
    }
    if (!filterBy && !title) {
      const books = await Book.find().sort({ price: sort });
      return res.status(200).send({
        isError: false,
        data: books,
      });
    }
    if (!filterBy && !sortBy) {
      const books = await Book.find({
        title: { $regex: title, $options: "i" },
      });
      return res.status(200).send({
        isError: false,
        data: books,
      });
    }
    const books = await Book.find({
      genre: filterBy,
      title: { $regex: title, $options: "i" },
    }).sort({ price: sort });
    res.status(200).send({
      isError: false,
      data: books,
    });
  } catch (error) {
    res.status(400).send({
      isError: true,
      msg: error.msg,
    });
  }
});

module.exports = { bookRouter };
