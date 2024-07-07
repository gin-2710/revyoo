import mongoose from "mongoose";

import dotenv from "dotenv";
//Loads key-value pairs from the .env file into process.env
dotenv.config();
const password = process.env.mongoDB_password;

//The connection url
const connectionString =
  "mongodb+srv://singingginsinkothis:" +
  password +
  "@revyoo.k1n68s8.mongodb.net/revyoo?appName=revyoo";

//The function to connect to our DB
const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

export default connectDB;
