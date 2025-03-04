const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { connectDB } = require("./configs/connectDb");
const { corsOptions } = require("./configs/corsOptions");
const { verifyJWT } = require("./middlewares/verifyJWT");

const app = express();
const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());

    app.use("/auth", require("./routes/auth"));

    app.use(verifyJWT);
    app.use("/account", require("./routes/account"));
    app.use("/transaction", require("./routes/trnx"));
    app.use("/user", require("./routes/user"));

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
