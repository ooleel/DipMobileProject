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

  await db.createCollection("users");
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
      passwordHas: "5f4dcc3b5aa765d61d8327deb882cf99",
      role: "admin",
      createdAt: "",
    },
    {
      name: "Bob",
      email: "bob@example.com",
      passwordHas: "5f4dcc3b5aa765d61d8327deb882cf99",
      role: "member",
      createdAt: "",
    },
  ]);
  console.log('Inserted seed data into "users"');
  process.exit(0);
}

resetDatabase().catch((err) => {
  console.error("Error resetting database:", err);
  process.exit(1);
});
