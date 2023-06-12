import express from "express";
import {connect} from "mongoose";

import configService from "./src/config/config.service";
import Bot from "./src/classes/bot";

const bot = new Bot(configService);
const app = express();
const PORT = configService.get("PORT");

(async function () {
  try {
    bot.init();

    await connect(configService.get("DB_CONN_STRING"));

    app.listen(PORT);
  } catch (error) {
    console.log(`Server start error: ${error}`);
  }
})();
