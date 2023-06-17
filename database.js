const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri =
  "mongodb+srv://The_AM_POS:cs50xntu1jan@cluster0.llblkd8.mongodb.net/The_AM_POS";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
