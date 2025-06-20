import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/seniorlearn";
const client = new MongoClient(uri);

export async function connectToDatabase(): Promise<Db> {
  try {
    await client.connect();
    return client.db("seniorlearn");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
