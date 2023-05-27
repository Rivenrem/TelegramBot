const { Telegraf } = require("telegraf");
require("dotenv").config();
const helpText = require("./constants");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(
    `Hello ${
      ctx.message.from.first_name ? ctx.message.from.first_name : "stranger"
    }!`
  )
);
bot.help((ctx) => ctx.reply(helpText.commands));
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
