export default function getRandomNumber(limit: number) {
    return Math.floor(Math.random() * (limit - 2) + 1);
}
