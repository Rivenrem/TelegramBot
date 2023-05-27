require("dotenv").config();
const axios = require("axios");
const { Telegraf, Markup, Input } = require("telegraf");
const text = require("./src/constants/constants");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(
    `Hello ${
      ctx.message.from.first_name ? ctx.message.from.first_name : "stranger"
    }!`
  )
);

bot.help((ctx) => ctx.reply(text.commands));

bot.command("weather", async (ctx) => {
  try {
    await ctx.replyWithHTML(text.weatherText);
  } catch (error) {
    console.error(error);
  }
});

bot.on("message", async (ctx) => {
  const URL = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY} &q=${ctx.message.text}&aqi=no`;

  try {
    const response = await axios.get(URL);

    await ctx.replyWithHTML(
      `Current weather in ${response.data.location.name}: <b>${response.data.current.temp_c}°C ${response.data.current.condition.text}</b>
      `
    );

    await ctx.replyWithPhoto({
      source: `./src/images/${response.data.current.condition.icon
        .split("/")
        .slice(-2)
        .join("/")}`,
    });
  } catch (error) {
    console.error(error);
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
