export default function uvIndexProcessing(uvIndex: number) {
  return uvIndex < 4
    ? `UV-index is ${uvIndex}: it's safe for your skin !`
    : `UV-index is ${uvIndex}: use sunscreen !`;
}
