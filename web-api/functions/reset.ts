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
  await db.createCollection("bulletins");
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
  console.log('Inserted seed data into "users"');
  process.exit(0);
}

resetDatabase().catch((err) => {
  console.error("Error resetting database:", err);
  process.exit(1);
});
