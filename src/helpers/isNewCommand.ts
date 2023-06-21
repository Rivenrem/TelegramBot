import { constants } from 'Constants/index';

export function isNewCommand(message: string): boolean {
    return message.slice(1).toUpperCase() in constants.Commands;
}