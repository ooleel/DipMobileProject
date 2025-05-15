import express, { Request, Response } from "express";
import { connectToDatabase } from "./functions/mongoClient";
import { createUser } from "./functions/createUser";
import { generateToken } from "./auth/jwt";
import { WithId } from "mongodb";
import bcrypt from "bcrypt";

const cors = require("cors");
const app = express();
const port = 3000;

interface User {
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

app.use(cors());
app.use(express.json());

app.post("/createuser", async (req: Request, res: Response) => {
  const result = await createUser(req.body);

  if (result.success) {
    res.status(201).json({
      message: "User created successfully",
      userId: result.userId,
    });
  } else {
    res.status(400).json({
      message: result.message || "User creation failed",
    });
  }
});

app.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const db = await connectToDatabase();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken({ userId: user._id, email: user.email });

  res.json({ token });
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection<User>("users");

    const users: WithId<User>[] = await usersCollection.find().toArray();

    res.status(200).json({
      message: "Users retrieved successfully",
      status: "success",
      code: 200,
      users,
    });
  } catch (err) {
    console.error("Error reading users:", err);
    res.status(500).json({
      message: "Internal Server Error",
      status: "error",
      code: 500,
    });
  }
});

app.get("/", (req: Request, res: Response) => {
  const data = {
    message: "Request Succeeded",
    status: "success",
    code: 200,
  };
  res.json(data);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
