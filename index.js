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
    const weatherData = (await axios.get(URL)).data;

    await ctx.replyWithHTML(
      `Current weather in ${weatherData.location.name}: <b>${weatherData.current.temp_c}°C ${weatherData.current.condition.text}</b>
      `
    );

    await ctx.replyWithPhoto({
      source: `./src/images/${weatherData.current.condition.icon
        .split("/")
        .slice(-2)
        .join("/")}`,
    });
  } catch (error) {
    error.response.statusText === "Bad Request"
      ? await ctx.reply(
          "Sorry I don't know this place 🙈 Let's try something else !"
        )
      : await ctx.reply("Something went wrong...lets try again ! 🤓");
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
