const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
