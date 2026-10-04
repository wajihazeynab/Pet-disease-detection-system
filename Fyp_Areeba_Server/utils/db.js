const { default: mongoose } = require("mongoose");
require("dotenv").config()

const connectDb = async () => {
  return new Promise((resolve, reject) => {
    mongoose
      // mongodb://localhost:27017
      .connect("mongodb://127.0.0.1:27017/pet-care")
      // .connect(process.env.MONGO_DB_URL)
      .then(() => {
        console.log("Database connected");
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = { connectDb };