const commands = `/help - get a list of commands
/start - to restart the bot
/cat - get a photo of an adorable cat
/dog - get a photo of an adorable dog
/weather - check the weather
`;

const weatherText = `
Please, tell me the city you want to know the weather 🌤️
`;

const errorMessage = `
Something went wrong...lets try again ! 🤓
`;

const BadRequestMessage = `
Sorry I don't know this place 🙈 Let's try something else !
`;

module.exports.commands = commands;
module.exports.weatherText = weatherText;
module.exports.errorMessage = errorMessage;
module.exports.BadRequestMessage = BadRequestMessage;
