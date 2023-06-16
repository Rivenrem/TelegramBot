import { constants } from '../constants/index';

export function uvIndexProcessing(uvIndex: number) {
    return uvIndex <= constants.Numbers.safeUvIndex
        ? `UV-index is ${uvIndex}: it's safe for your skin !`
        : `UV-index is ${uvIndex}: use sunscreen !`;
}
