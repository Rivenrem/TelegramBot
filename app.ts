/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';

import express from 'express';
import { connect, disconnect } from 'mongoose';

import { Bot } from './src/classes/bot';
import { envVariables } from './src/constants/env';
import { clientErrorHandler } from './src/middleware/clientErrorHandler';

const { PORT } = envVariables;

const app = express();
const bot = new Bot();

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
