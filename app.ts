import 'dotenv/config';

import { Bot } from 'Classes/bot';
import { connectToDB } from 'Config/db.config';
import { envVariables } from 'Constants/envVariables';
import express from 'express';
import { clientErrorHandler } from 'Middleware/clientErrorHandler';
import { disconnect } from 'mongoose';

const { PORT } = envVariables;

export const bot = new Bot();

const app = express();
app.use(clientErrorHandler);

const server = app.listen(PORT);
bot.init();

connectToDB(envVariables.DB_CONN_STRING);

function close(code: number) {
    disconnect();
    server.close();
    process.exit(code);
}

process.on('unhandledRejection', () => {
    close(1);
});

process.stdin.resume();

process.on('SIGTERM', () => {
    close(0);
});
