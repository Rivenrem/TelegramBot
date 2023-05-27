require("dotenv").config();
const axios = require("axios");
const { Telegraf, Input } = require("telegraf");
const text = require("./src/constants/constants");
const {
  getRandomPhotoCommand,
} = require("./src/helpers/getRandomPhotoCommand.js");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(`Hello ${ctx.message.from.first_name || "stranger"}!`)
);

bot.help((ctx) => ctx.reply(text.commands));

bot.command("weather", (ctx) => {
  try {
    ctx.replyWithHTML(text.weather);
  } catch {
    ctx.reply(text.errorMessage);
  }
});

getRandomPhotoCommand("cat", bot);
getRandomPhotoCommand("dog", bot);

bot.on("message", async (ctx) => {
  const URL = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY} &q=${ctx.message.text}&aqi=no`;

  try {
    const responseData = (await axios.get(URL)).data;

    await ctx.replyWithHTML(
      `Current weather in ${responseData.location.name}: <b>${responseData.current.temp_c}°C ${responseData.current.condition.text}</b>
      `
    );

    await ctx.replyWithPhoto({
      source: `./src/images/${responseData.current.condition.icon
        .split("/")
        .slice(-2)
        .join("/")}`,
    });
  } catch (error) {
    if (error.response.statusText === "Bad Request") {
      ctx.reply(text.badRequestMessage);
    } else {
      ctx.reply(text.errorMessage);
    }
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
