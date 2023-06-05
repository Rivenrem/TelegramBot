import express from "express";
import { connect } from "mongoose";
import { ConfigService } from "./src/config/config.service";
import { taskRouter } from "./src/routes/task-routs";

const configService = new ConfigService();

const app = express();
const PORT = configService.get("PORT");

function connectToDB() {
  connect(configService.get("DB_CONN_STRING"))
    .then(() => console.log("Connected to DB"))
    .catch((error) => {
      console.log(`DB connection error: ${error}`);
    });
}

export async function startServer() {
  try {
    connectToDB();
    app.use("/tasks", taskRouter);
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Server start error: ${error}`);
  }
}
