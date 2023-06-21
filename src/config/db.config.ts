import { connect } from 'mongoose';

export async function connectToDB(DB_CONN_STRING: string): Promise<void> {
    try {
        await connect(DB_CONN_STRING);
    } catch (error) {
        throw new Error(`Connection to DB error: ${error}`);
    }
}
