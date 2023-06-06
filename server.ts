import express from "express";
import { connect } from "mongoose";
import { ConfigService } from "./src/config/config.service";

const configService = new ConfigService();

const app = express();
const PORT = configService.get("PORT");

async function connectToDB() {
  try {
    await connect(configService.get("DB_CONN_STRING"));
    console.log("Connected to DB");
  } catch (error) {
    console.log(`DB connection error: ${error}`);
  }
}

export async function startServer() {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Server start error: ${error}`);
  }
}
