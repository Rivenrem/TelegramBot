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
const done = 'Done ! ✅';

const loading = 'Loading...';

const safeUvIndex = 3;
const responseLimin = 500;

enum Weather {
    forecast = 'Please, tell me the city you want to know the weather 🌤️',
    subscribtion = 'Please, tell me the city you want to subscribe on 🌤️',
    wrongLocation = "Sorry, but it's incorrect location.",
    subscribtionTime = 'Type at which hour you want to receive your weather. Send to me time in 24-hours format (e.g. 08:23)',
    scheduledMessage = 'Here are your daily weather 🌤️',
}

enum SuggestPlace {
    city = 'In which city would you like to receive an offer of places ?',
}

enum Error {
    notSubscribed = 'You are not subscribed',
    base = "Something went wrong, let's try again ⛔",
    badWeatherRequest = "Sorry I don't know this place 🙈 Let's try something else !",
    wrongTime = 'Wrong time format.Try again',
    noTasks = "You don't have tasks. Lets create them ?",
    noEnvFile = 'There is no .env file',
    emptyEnv = '.env file is empty',
    wrongEnvKey = 'No value for this key',
}

enum Task {
    addTask = 'What do you want to do ?',
    reminderTime = 'When to remind you of a task ? Send to me time in 24-hours format (e.g. 08:23)',
}

export default {
    commands,
    done,
    Weather,
    SuggestPlace,
    Error,
    Task,
    loading,
    safeUvIndex,
    responseLimin,
};
