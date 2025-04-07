// start/mongodb.ts
import { MongoClient, Db } from 'mongodb'
import env from '#start/env' // ✅ gunakan alias jika sudah diset

let db: Db

export async function connectMongo(): Promise<void> {
  const client = new MongoClient(env.get('MONGO_URI'))
  await client.connect()
  db = client.db(env.get('MONGO_DB_NAME'))
  console.log('✅ MongoDB connected')
}

export function getMongoDb(): Db {
  if (!db) {
    throw new Error('❌ MongoDB not connected. Please call connectMongo() first.')
  }
  return db
}
