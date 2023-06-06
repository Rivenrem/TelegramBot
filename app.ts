import express from "express";
import { connect } from "mongoose";

import configService from "./src/config/config.service";
import Bot from "./src/decorators/bot";

const bot = new Bot(configService);
const app = express();
const PORT = configService.get("PORT");

(async function () {
  try {
    bot.init();

    await connect(configService.get("DB_CONN_STRING"));
    console.log("Connected to DB");

    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Server start error: ${error}`);
  }
})();
