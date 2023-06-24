const help = `/help - get a list of commands

/start - to restart the bot

/cat - get a photo of an adorable cat
/dog - get a photo of an adorable dog

/weather - check the weather
/subscribe - subscribe to a daily weather updates
/unsubscribe - unsubscribe from daily weather updates

/task - get all your tasks, delete them, or create reminder of them

/suggest - receive an offer of places where to go in the specified city 
`;

enum SuggestPlace {
    city = 'In which city would you like to receive an offer of places?',
}

enum Task {
    addTask = 'What do you want to do ?',
    reminderTime = 'When to remind you of a task ? Send time in the 24-hours format (e.g. 08:23)',
    getButton = 'Get all my tasks 📝',
    addButton = 'Add new task ✏️',
    yesButton = "Yes ! Let's add first task.",
    remindButton = 'Add reminder ⏰',
    deleteButton = 'Delete task ❌',
}

enum Weather {
    forecast = 'Please, tell me the city you want to know the weather 🌤️',
    subscribtion = 'Please, tell me the city you want to subscribe on 🌤️',
    wrongLocation = "Sorry, but it's incorrect location.",
    subscribtionTime = 'Type at which hour you want to receive your weather. Send time in the 24-hours format (e.g. 08:23)',
    scheduledMessage = 'Here are your daily weather 🌤️',
    staticSourceURL = './src/assets/images/',
}

export const commandsText = {
    Weather,
    Task,
    SuggestPlace,
    help,
};
