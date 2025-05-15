import { connectToDatabase } from "./mongoClient";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

interface CreateUserInput {
  name: string;
  email: string;
  age: number;
  password: string;
}

interface CreateUserResult {
  success: boolean;
  userId?: ObjectId;
  message?: string;
}

const SALT_ROUNDS = 12;

export async function createUser(
  input: CreateUserInput,
): Promise<CreateUserResult> {
  const { name, email, age, password } = input;

  // Basic validation
  if (!name || !email || typeof age !== "number" || !password) {
    return { success: false, message: "Missing required fields" };
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    // Check for existing user by email
    const existing = await usersCollection.findOne({ email });
    if (existing) {
      return { success: false, message: "Email already in use" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = {
      name,
      email,
      role: "member",
      passwordHash: hashedPassword,
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(user);

    return {
      success: true,
      userId: result.insertedId,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
