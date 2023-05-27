require("dotenv").config();
const axios = require("axios");
const { Telegraf, Input } = require("telegraf");
const text = require("./src/constants/constants");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(`Hello ${ctx.message.from.first_name || "stranger"}!`)
);

bot.help((ctx) => ctx.reply(text.commands));

bot.command("weather", (ctx) => {
  try {
    ctx.replyWithHTML(text.weatherText);
  } catch {
    ctx.reply(text.errorMessage);
  }
});

function getRandomPhotoCommand(category) {
  const URL = `https://pixabay.com/api/?key=${process.env.PHOTOS_API_KEY}&q=${category}&image_type=photo&per_page=200`;

  bot.command(category, async (ctx) => {
    const randomNumber = Math.round(-0.5 + Math.random() * 201);
    try {
      const responseData = (await axios.get(URL)).data;
      ctx.replyWithPhoto(
        Input.fromURL(responseData.hits[randomNumber].webformatURL)
      );
    } catch {
      ctx.reply(text.errorMessage);
    }
  });
}

getRandomPhotoCommand("cat");
getRandomPhotoCommand("dog");

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
      ctx.reply(text.BadRequestMessage);
    } else {
      ctx.reply(text.errorMessage);
    }
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
