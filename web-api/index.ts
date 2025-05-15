import express, { Request, Response } from "express";
import { connectToDatabase } from "./mongoClient";
import { WithId } from "mongodb";

const cors = require("cors");
const app = express();
const port = 3000;

interface User {
  name: string;
  email: string;
  age?: number;
}

app.use(cors());

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
