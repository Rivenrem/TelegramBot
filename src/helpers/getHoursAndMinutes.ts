const regExp = new RegExp(/\b([01][0-9]|2[0-3]):([0-5][0-9])\b/);

export const getHoursAndMinutes = (str: string): Array<string> | undefined => {
  if (str.match(regExp)) {
    const [fullTime, HH, MM] = str.match(regExp) as RegExpMatchArray;
    return [HH, MM];
  }
};
