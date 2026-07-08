import { Db, MongoClient, ServerApiVersion } from "mongodb";

import { env } from "../config/env";

let client: MongoClient | null = null;
let database: Db | null = null;

export async function connectToDatabase() {
  if (client && database) {
    return { client, database };
  }

  client = new MongoClient(env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });

  await client.connect();
  database = client.db(env.MONGODB_DB_NAME);
  await database.command({ ping: 1 });

  console.log(`MongoDB connected: ${env.MONGODB_DB_NAME}`);

  return { client, database };
}

export function getDatabase() {
  if (!database) {
    throw new Error("MongoDB is not connected. Call connectToDatabase() first.");
  }

  return database;
}

export function isDatabaseConnected() {
  return Boolean(client && database);
}

export async function closeDatabaseConnection() {
  if (!client) {
    return;
  }

  await client.close();
  client = null;
  database = null;
}

