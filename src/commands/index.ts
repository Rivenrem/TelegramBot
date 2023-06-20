import { Command } from 'Classes/command.class';
import { HelpCommand } from 'Commands/help.command';
import { PhotoCommand } from 'Commands/photo.command';
import { StartCommand } from 'Commands/start.command';
import { WeatherSubscribtion } from 'Commands/subscribeWeather.command';
import { SuggestCommand } from 'Commands/suggestPlace.command';
import { TaskCommand } from 'Commands/task.command';
import { WeatherCommand } from 'Commands/weather.commmand';

export const commands = {
    HelpCommand,
    PhotoCommand,
    StartCommand,
    SuggestCommand,
    TaskCommand,
    WeatherCommand,
    WeatherSubscribtion,
    Command,
};
