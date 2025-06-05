import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongoClient";

async function resetDatabase() {
  const db = await connectToDatabase();

  const collections = await db.collections();

  for (const collection of collections) {
    const name = collection.collectionName;
    await collection.drop();
    console.log(`Dropped collection "${name}"`);
  }

  console.log("All collections dropped.");

  await db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "email", "passwordHash", "role", "createdAt"],
        properties: {
          name: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          email: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          passwordHash: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          role: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          createdAt: {
            bsonType: "date",
            description: "required date",
          },
        },
      },
    },
  });
  await db.createCollection("bulletins", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title", "content", "type", "createdBy", "createdAt"],
        properties: {
          title: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          content: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          type: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          createdBy: {
            bsonType: "objectId",
            description: "must be a string and is required",
          },
          createdAt: {
            bsonType: "date",
            description: "required date",
          },
        },
      },
    },
  });
  await db.createCollection("sessions");
  console.log("Recreated collections");

  // Passwords use md5 for testing purposes
  // All passwords are "password"
  // Change later according to documentation
  await db.collection("users").insertMany([
    {
      name: "Alice",
      email: "alice@example.com",
      passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99",
      role: "admin",
      createdAt: new Date(),
    },
    {
      name: "Bob",
      email: "bob@example.com",
      passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99",
      role: "member",
      createdAt: new Date(),
    },
  ]);
  const aliceid = await db
    .collection("users")
    .findOne({ email: "alice@example.com" });
  const bobid = await db
    .collection("users")
    .findOne({ email: "bob@example.com" });
  await db.collection("bulletins").insertMany([
    {
      title: "Post 1",
      content: "This is an example post",
      type: "official",
      createdBy: new ObjectId(aliceid?._id),
      createdAt: new Date(),
      status: "this is a status",
    },
    {
      title: "Post 2",
      content: "This is an example post",
      type: "member",
      createdBy: new ObjectId(bobid?._id),
      createdAt: new Date(),
    },
    {
      title: "Post 3",
      content: "This is an example post",
      type: "official",
      createdBy: new ObjectId(aliceid?._id),
      createdAt: new Date(),
    },
    {
      title: "Post 4",
      content: "This is an example post",
      type: "official",
      createdBy: new ObjectId(aliceid?._id),
      createdAt: new Date(),
    },
    {
      title: "Post 5",
      content: "This is an example post",
      type: "member",
      createdBy: new ObjectId(bobid?._id),
      createdAt: new Date(),
    },
  ]);
  console.log("Finished resetting the Database");
  process.exit(0);
}

resetDatabase().catch((err) => {
  console.error("Error resetting database:", err);
  process.exit(1);
});
