import cron from "node-cron";
import { Context } from "telegraf";
import { displayWeather } from "./displayWeather";

export const scheduledWeatherTask = (
  ctx: Context,
  id: number | undefined,
  location: string
) =>
  cron.schedule(
    "*/1 * * * *",
    () => {
      if (id) {
        displayWeather(ctx, location);

        ctx.telegram.sendMessage(id, "Here is your daily weather ! 🌤");
      } else {
        throw new Error();
      }
    },
    { scheduled: true }
  );
