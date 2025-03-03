const { default: mongoose } = require("mongoose");

const DATABASE_URI = process.env.DATABASE_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Unable to connect to database.", error);
  }
};

module.exports = { connectDB };
