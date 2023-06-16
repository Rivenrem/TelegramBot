/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';

import express from 'express';
import { connect } from 'mongoose';

import { Bot } from './src/classes/bot';
import { envVariables } from './src/constants/env';

const app = express();

const bot = new Bot();
const { PORT } = envVariables;

(() => {
    bot.init();

    connect(envVariables.DB_CONN_STRING);

    app.listen(PORT);
})();
