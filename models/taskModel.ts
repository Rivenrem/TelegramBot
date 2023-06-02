import { ObjectId } from "mongodb";

// interface ITask {
//   name: string;
//   chatID: string;
//   text: string;
//   id?: ObjectId;
// }

export default class Task {
  constructor(
    public name: string,
    public chatID: string,
    public text: string,
    public id?: ObjectId
  ) {}
}
