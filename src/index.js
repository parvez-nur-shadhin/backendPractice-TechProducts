import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB().then(() => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at PORT ${process.env.PORT}`);
    });
    app.get("/", (req, res) => {
      res.send("Server is running");
    });
  } catch (error) {
    console.log("Mongodb connection failed: ", error);
  }
});
