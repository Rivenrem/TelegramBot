const regExp = /\b([01]\d|2[0-3]):([0-5]\d)\b/;

export function getHoursAndMinutes(time: string): Array<string> | undefined {
    if (regExp.test(time)) {
        const [, HH, MM] = time.match(regExp) as RegExpMatchArray;
        return [HH, MM];
    }
    return undefined;
}
