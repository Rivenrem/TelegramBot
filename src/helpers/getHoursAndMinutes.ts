const regExp = new RegExp(/\b([01][0-9]|2[0-3]):([0-5][0-9])\b/);

export default function getHoursAndMinutes(
  str: string
): Array<string> | undefined {
  if (str.match(regExp)) {
    const [, HH, MM] = str.match(regExp) as RegExpMatchArray;
    return [HH, MM];
  }
}
