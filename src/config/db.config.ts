import { constants } from 'Constants/index';
import { connect } from 'mongoose';

export async function connectToDB(DB_CONN_STRING: string): Promise<void> {
    try {
        await connect(DB_CONN_STRING);
    } catch {
        throw new Error(constants.Errors.dbConnectionError);
    }
}
