/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';

import { Bot } from 'Classes/bot';
import { connectToDB } from 'Config/db.config';
import { envVariables } from 'Constants/env';
import express from 'express';
import { clientErrorHandler } from 'Middleware/clientErrorHandler';
import { disconnect } from 'mongoose';

const { PORT } = envVariables;

export const bot = new Bot();

const app = express();
const server = app.listen(PORT);
app.use(clientErrorHandler);

bot.init();

connectToDB(envVariables.DB_CONN_STRING);

const unhandledRejections = new Map();

process.on('unhandledRejection', (reason, promise) => {
    unhandledRejections.set(promise, reason);
});
process.on('rejectionHandled', promise => {
    unhandledRejections.delete(promise);
});

process.stdin.resume();
process.on('SIGTERM', () => {
    disconnect();
    server.close();
    process.exit(0);
});
