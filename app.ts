/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';

import { Bot } from 'Classes/bot';
import { envVariables } from 'Constants/env';
import express from 'express';
import { clientErrorHandler } from 'Middleware/clientErrorHandler';
import { connect, disconnect } from 'mongoose';

const { PORT } = envVariables;

const app = express();
export const bot = new Bot();

bot.init();
connect(envVariables.DB_CONN_STRING);
const server = app.listen(PORT);
app.use(clientErrorHandler);

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
