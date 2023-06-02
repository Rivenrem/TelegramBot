import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";
import { ConfigService } from "./config.service";

const configService = new ConfigService();

export const collections: { ToDos?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    configService.get("DB_CONN_STRING")
  );

  await client.connect();

  const db: mongoDB.Db = client.db(configService.get("DB_NAME"));

  const ToDosCollection: mongoDB.Collection = db.collection(
    configService.get("COLLECTION_NAME")
  );

  collections.ToDos = ToDosCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${ToDosCollection.collectionName}`
  );
}
