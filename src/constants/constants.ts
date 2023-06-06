const commands = `/help - get a list of commands
/start - to restart the bot
/cat - get a photo of an adorable cat
/dog - get a photo of an adorable dog
/weather - check the weather
/subscribe - subscribe to a daily weather updates
/unsubscribe - unsubscribe from daily weather updates
/task - get all your tasks, delete them, or create reminder of them
/suggest - receive an offer of places where to go in the specified city 
`;

const weather = `
Please, tell me the city you want to know the weather 🌤️
`;

const weatherSubscribtion = `
Please, tell me the city you want to subscribe on 🌤️
`;

const error = `
Something went wrong, let's try again ⛔
`;

const badRequest = `
Sorry I don't know this place 🙈 Let's try something else !
`;

const done = `
Done ! ✅
`;

const wrongLocationSubscribe = `
Sorry, but it's incorrect location.
Please send me the city name for subscription !
`;

const notSubscribed = `
You are not subscribed
`;

const addTask = `
What do you want to do ?
`;

export default {
  commands,
  weather,
  weatherSubscribtion,
  error,
  badRequest,
  done,
  wrongLocationSubscribe,
  notSubscribed,
  addTask,
};
