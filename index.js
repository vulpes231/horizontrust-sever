const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { connectDB } = require("./configs/connectDb");

const app = express();
const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());

    app.use("/auth", require("./routes/auth"));

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
