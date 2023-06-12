import {IConfigService} from ".";
import * as dotenv from "dotenv";
import messages from "../constants";

class ConfigService implements IConfigService {
  private config: dotenv.DotenvParseOutput;

  constructor() {
    const {error, parsed} = dotenv.config();
    if (error) {
      throw new Error(messages.Error.noEnvFile);
    }
    if (!parsed) {
      throw new Error(messages.Error.emptyEnv);
    }
    this.config = parsed;
  }

  get(key: string): string {
    const value = this.config[key];
    if (!value) {
      throw new Error(messages.Error.wrongEnvKey);
    }
    return value;
  }
}

export default new ConfigService();
