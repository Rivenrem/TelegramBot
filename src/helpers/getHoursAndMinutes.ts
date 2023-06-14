const regExp = new RegExp(/\b([01][0-9]|2[0-3]):([0-5][0-9])\b/);

export default function getHoursAndMinutes(
    time: string,
): Array<string> | undefined {
    if (time.match(regExp)) {
        const [, HH, MM] = time.match(regExp) as RegExpMatchArray;
        return [HH, MM];
    }
}
