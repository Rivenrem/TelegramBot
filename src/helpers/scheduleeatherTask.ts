import cron, { ScheduledTask } from "node-cron";
import displayWeather from "./displayWeather";
import { MyContext } from "../context/context.interface";
import messages from "../constants/constants";

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
          messages.Weather.ScheduledMessage
        );
      }
    },
    {
      scheduled: true,
      timezone: "Europe/Minsk",
    }
  );
}
