const axios = require("axios");
const { Input } = require("telegraf");
const text = require("../constants/constants");

const getRandomPhotoCommand = (category, bot) => {
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
};

module.exports.getRandomPhotoCommand = getRandomPhotoCommand;
