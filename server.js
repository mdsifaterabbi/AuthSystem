import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT;
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import router from "./Routes/registrationRoute.js";

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
