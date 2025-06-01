// start/mongodb.ts
import { MongoClient, Db } from 'mongodb'
import env from '#start/env' // ✅ gunakan alias jika sudah diset

let db: Db

export async function connectMongo(): Promise<void> {
  const uri = env.get('MONGO_URI')
  const client = new MongoClient(uri, {
    tls: true, // wajib untuk Atlas
    retryWrites: true, // optional, biasanya sudah di URI
  })

  await client.connect()
  db = client.db(env.get('MONGO_DB_NAME'))
  console.log('✅ MongoDB connected')
}

export function getMongoDb(): Db {
  return db
}
