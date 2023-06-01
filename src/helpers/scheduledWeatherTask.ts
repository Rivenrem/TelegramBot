import cron, { ScheduledTask } from "node-cron";
import { displayWeather } from "./displayWeather";
import { MyContext } from "../context/context.interface";

export const scheduledWeatherTask = (ctx: MyContext): ScheduledTask =>
  cron.schedule(
    "*/1 * * * *",
    () => {
      if (ctx.session.chatID && ctx.session.subscribedLocation) {
        displayWeather(ctx, ctx.session.subscribedLocation);

        ctx.telegram.sendMessage(
          ctx.session.chatID,
          "Here is your daily weather ! 🌤"
        );
      } else {
        throw new Error();
      }
    },
    { scheduled: true }
  );
