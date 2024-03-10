/*
user name = user01
password = jcf5jmWXexE0v8B5

*/

import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT;
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import router from "./Routes/registrationRoute.js";
import path from "path";
import fs from "fs";
import multer from "multer";
import mongoose from "mongoose";

/* ============database MongoDB connection starts here============== */
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected to Mongodb database: ${con.connection.name}`.bgMagenta.white
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectDB();

/*=================database connection ends here========================*/

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Express JS server is running!");
});

app.use("/api/v1/auth", router);

app.listen(PORT, () => {
  console.log(
    `Authentication Project : Express Server is running on ${process.env.RUNNING_MODE} mode on port ${PORT}`
      .bgBlue.white
  );
});
