import { constants } from 'Constants/index';
import mongoose from 'mongoose';

export async function connectToDB(DB_CONN_STRING: string): Promise<void> {
    try {
        mongoose.set({ strictQuery: true });
        await mongoose.connect(DB_CONN_STRING);
    } catch {
        throw new Error(constants.Errors.dbConnectionError);
    }
}
