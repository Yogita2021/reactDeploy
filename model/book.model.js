const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String, enum: ["Fiction", "Science", "Comic"] },
  description: { type: String },
  price: { type: Number },
});

const Book = mongoose.model("book", bookSchema);

module.exports = { Book };
