import { MongoClient, Db } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function connectToDatabase(): Promise<Db> {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("seniorlearn");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
