import express, { Request, Response } from "express";
import { connectToDatabase } from "./functions/mongoClient";
import { createPost } from "./functions/createPost";
import { editPost } from "./functions/editPost";
import { createUser } from "./functions/createUser";
import { generateToken, verifyToken } from "./auth/jwt";
import { WithId, ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const cors = require("cors");
const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());

interface User {
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

interface Bulletin {
  title: string;
  content: string;
  type: string;
  createdBy: string;
  createdAt: Date;
}

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

// TODO Refresh tokens
app.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const db = await connectToDatabase();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken({ userId: user._id, email: user.email });
  res.status(201).json({ token });
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

app.get("/user/profile", async (req: Request, res: Response): Promise<any> => {
  const authHeader = req.headers.authorization;

  try {
    const decoded = verifyToken(String(authHeader));
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection<User>("users");

    const user = await usersCollection.findOne(
      { _id: new ObjectId(decoded.userId) },
      { projection: { passwordHash: 0 } }, // Exclude passwordHash from the response
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
    // or res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/test", async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  try {
    if (verifyToken(String(authHeader))) {
      console.log(verifyToken(String(authHeader)));
      res.status(200).json({ message: "success", authHeader });
    }
  } catch {
    res.status(404).json({ message: "failed" });
  }
});

// Add this endpoint to your index.ts file in the web-api folder

app.get("/user/profile", async (req: Request, res: Response): Promise<any> => {
  const authHeader = req.headers.authorization;

  try {
    const decoded = verifyToken(String(authHeader));
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne(
      { _id: new ObjectId(decoded.userId) },
      { projection: { passwordHash: 0 } }, // Exclude password hash
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(401).json({ message: "Invalid token" });
  }
});

// Add this endpoint for deleting posts (referenced in BulletinDetailsScreen)
app.delete("/deletepost", async (req: Request, res: Response): Promise<any> => {
  const authHeader = req.headers.authorization;
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  try {
    const decoded = verifyToken(String(authHeader));
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    const postsCollection = db.collection("bulletins");

    const user = await usersCollection.findOne({
      _id: new ObjectId(decoded.userId),
    });
    const post = await postsCollection.findOne({ _id: new ObjectId(postId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user can delete (post author or admin)
    if (post.createdBy.toString() !== decoded.userId && user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    const result = await postsCollection.deleteOne({
      _id: new ObjectId(postId),
    });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(500).json({ message: "Failed to delete post" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/editpost", async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const checkUser = verifyToken(String(authHeader));
  if (!checkUser) {
    res
      .status(403)
      .json({ message: "This option is only available to members." });
  }
  const result = await editPost(req.body, checkUser.userId);
  if (result.success) {
    res.status(201).json({
      message: "Post updated successfully",
      postId: result.postId,
    });
  } else {
    res.status(400).json({
      message: result.message || "Post Edit failed",
    });
  }
});

app.post("/createpost", async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const checkUser = verifyToken(String(authHeader));
  if (!checkUser) {
    res
      .status(403)
      .json({ message: "This option is only available to members." });
  }
  const result = await createPost(req.body, checkUser.userId);
  if (result.success) {
    res.status(201).json({
      message: "Post created successfully",
      postId: result.postId,
    });
  } else {
    res.status(400).json({
      message: result.message || "Post creation failed",
    });
  }
});

app.get("/posts", async (req: Request, res: Response): Promise<any> => {
  try {
    const db = await connectToDatabase();
    const bulletinCollection = db.collection<Bulletin>("bulletins");
    const usersCollection = db.collection<User>("users");

    const limit = parseInt(req.query.limit as string) || 5;
    const typeFilter = (req.query.type as string) || "official";

    if (typeFilter === "member") {
      const authHeader = req.headers.authorization;
      if (!verifyToken(String(authHeader))) {
        return res
          .status(403)
          .json({ message: "This option is only available to members." });
      }
    }

    const query: Partial<Bulletin> = {};
    if (typeFilter) {
      query.type = typeFilter;
    }

    const posts: WithId<Bulletin>[] = await bulletinCollection
      .find(query)
      .limit(limit)
      .toArray();

    // Fetch user names for each post
    const userIds = posts.map((post) => new ObjectId(post.createdBy));
    const users = await usersCollection
      .find({ _id: { $in: userIds } })
      .project({ name: 1 }) // Only need the name
      .toArray();

    const userMap = new Map<string, string>();
    users.forEach((user) => {
      userMap.set(user._id.toString(), user.name);
    });

    // Replace createdBy with the user's name
    const postsWithNames = posts.map((post) => ({
      ...post,
      createdBy: userMap.get(post.createdBy.toString()) || "Unknown",
    }));

    res.status(200).json({
      message: "Posts retrieved successfully",
      status: "success",
      code: 200,
      posts: postsWithNames,
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
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

export default app;
