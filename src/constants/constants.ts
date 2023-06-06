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

const weather = "Please, tell me the city you want to know the weather 🌤️";

const weatherSubscribtion =
  "Please, tell me the city you want to subscribe on 🌤️";

const suggestCity =
  "In which city would you like to receive an offer of places ?";

const error = "Something went wrong, let's try again ⛔";

const badRequest =
  "Sorry I don't know this place 🙈 Let's try something else !";

const done = "Done ! ✅";

const wrongLocationSubscribe = `
Sorry, but it's incorrect location.
Please send me the city name for subscription!`;

const notSubscribed = "You are not subscribed";

const addTask = "What do you want to do ?";

const weatherSubscribtionTime =
  "Type at which hour you want to receive your weather. Send to me time in 24-hours format (e.g. 08:23)";

const reminderTime =
  "When to remind you of a task ? Send to me time in 24-hours format (e.g. 08:23)";

const noTasks = "You don't have tasks. Lets create them ?";
const wrongTime = "Wrong time format.Try again";

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
  weatherSubscribtionTime,
  noTasks,
  reminderTime,
  wrongTime,
  suggestCity,
};
