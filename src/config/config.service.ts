import { IConfigService } from "./config.interface";
import * as dotenv from "dotenv";

class ConfigService implements IConfigService {
  private config: dotenv.DotenvParseOutput;

  constructor() {
    const { error, parsed } = dotenv.config();
    if (error) {
      throw new Error("There is no .env file");
    }
    if (!parsed) {
      throw new Error(".env file is empty");
    }
    this.config = parsed;
  }

  get(key: string): string {
    const res = this.config[key];
    if (!res) {
      throw new Error("No key");
    }
    return res;
  }
}

export default new ConfigService();
