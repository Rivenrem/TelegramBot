import express from 'express';
import { connect } from 'mongoose';
import dotenv from 'dotenv';

import Bot from '#classes/bot.ts';

dotenv.config();
const app = express();

const bot = new Bot();
const PORT = process.env.PORT;

(async function () {
    try {
        bot.init();

        await connect(process.env.DB_CONN_STRING!);

        app.listen(PORT);
    } catch (error) {}
})();
