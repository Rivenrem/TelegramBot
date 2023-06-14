import constants from '#constants/index.ts';

export default function uvIndexProcessing(uvIndex: number) {
    return uvIndex <= constants.safeUvIndex
        ? `UV-index is ${uvIndex}: it's safe for your skin !`
        : `UV-index is ${uvIndex}: use sunscreen !`;
}
