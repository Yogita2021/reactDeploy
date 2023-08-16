const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { bookRouter } = require("./Route/book.route");
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("I am a server");
});
app.use("/book", bookRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db at port 3030");
  } catch (error) {
    console.log(error);
    console.log("not connected to db");
  }
});
