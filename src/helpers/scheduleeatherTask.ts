import cron, { ScheduledTask } from "node-cron";
import { displayWeather } from "./displayWeather";
import { MyContext } from "../context/context.interface";

export const scheduleWeatherTask = (
  ctx: MyContext,
  hour: string
): ScheduledTask =>
  cron.schedule(
    `0 ${hour} * * *`,
    () => {
      if (ctx.session.chatID && ctx.session.subscribedLocation) {
        displayWeather(ctx, ctx.session.subscribedLocation);

        ctx.telegram.sendMessage(
          ctx.session.chatID,
          "Here is your daily weather ! 🌤"
        );
      }
    },
    { scheduled: true }
  );
