import axios, { AxiosResponse } from "axios";
import { Task, TaskClass } from "../../models/task";
import { MyContext } from "../context/context.interface";
import { Message } from "typegram";
import { IConfigService } from "../config/config.interface";
import { addTask } from "../../repositories/task.repository";
export const createTask = async (
  ctx: MyContext,
  configService: IConfigService
) => {
  const message = ctx.message as Message.TextMessage;
  let tasks: AxiosResponse;

  if (!ctx.session.dbObjectID && ctx.chat !== undefined) {
    await addTask(new Task([message], ctx.chat.id), ctx);
  } else {
    tasks = await axios
      .get(
        `http://localhost:${configService.get("PORT")}/tasks/${
          ctx.session.dbObjectID
        }`
      )
      .then((res) => (tasks = res));

    await axios.patch(`http://localhost:${configService.get("PORT")}/tasks`);
  }
};
