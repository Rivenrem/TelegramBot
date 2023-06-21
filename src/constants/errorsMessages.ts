export enum Errors {
    notSubscribed = 'You are not subscribed',
    base = "Something went wrong, let's try again ⛔",
    unknownPlace = "Sorry I don't know this place 🙈 Let's try something else !",
    wrongTime = 'Wrong time format.Try again',
    noTasks = "You don't have tasks. Let's create them ?",
    noEnvironmentFile = 'There is no .env file',
    emptyEnvironment = '.env file is empty',
    wrongEnvironmentKey = 'No value for this key',
    taskNotFound = 'Task is not found',
    bagRequestMessage = 'No matching location found.',
    dbConnectionError = 'Connection to DB error',
}
