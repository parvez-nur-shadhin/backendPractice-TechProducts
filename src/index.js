import "dotenv/config";
import connectDB from "./db/index.js";
import express from "express";

const app = express();

connectDB().then(() => {
  try {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at PORT ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Mongodb connection failed: ", error);
  }
});
