import cron, { ScheduledTask } from "node-cron";
import displayWeather from "./displayWeather";
import { MyContext } from "../context/context.interface";

export default function scheduleWeatherTask(
  ctx: MyContext,
  HH: string,
  MM: string
): ScheduledTask {
  return cron.schedule(
    `${MM} ${HH} * * *`,
    () => {
      if (ctx.session.chatID && ctx.session.subscribedLocation) {
        displayWeather(ctx, ctx.session.subscribedLocation);

        ctx.telegram.sendMessage(
          ctx.session.chatID,
          "Here is your daily weather ! 🌤"
        );
      }
    },
    {
      scheduled: true,
      timezone: "Europe/Minsk",
    }
  );
}
