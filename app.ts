/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';

import express from 'express';
import { connect } from 'mongoose';

import Bot from './src/classes/bot';

const app = express();

const bot = new Bot();
const { PORT } = process.env;

(() => {
    bot.init();

    connect(process.env.DB_CONN_STRING);

    app.listen(PORT);
})();
