const mongoose = require("mongoose");

/*
    db.js description:
    This file contains the logic to connect to the MongoDB database.
    It uses the mongoose library to establish a connection to the database.
*/

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
