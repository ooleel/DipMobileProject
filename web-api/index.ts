import express, { Request, Response } from "express";
import { connectToDatabase } from "./functions/mongoClient";
import { createPost } from "./functions/createPost";
import { editPost } from "./functions/editPost";
import { createUser } from "./functions/createUser";
import { generateToken, verifyToken } from "./auth/jwt";
import { WithId, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /createuser:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User creation failed
 */
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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to an account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Token generated
 *       401:
 *         description: Token generation failed
 */
app.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const db = await connectToDatabase();
  const usersCollection = db.collection("users");

  //console.log("Login attempt for email:", email);
  const user = await usersCollection.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  //console.log("User found:", user);
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  //console.log("Password match:", isMatch);

  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken({ userId: user._id, email: user.email });
  res.status(201).json({ token });
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get authenticated user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Invalid token
 *       404:
 *         description: User not found
 */
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
  }
});

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Verify token validity (test endpoint)
 *     tags: [Internal]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       404:
 *         description: Invalid token
 */
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

/**
 * @swagger
 * /deletepost:
 *   delete:
 *     summary: Delete a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [postId]
 *             properties:
 *               postId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       400:
 *         description: Missing postId
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /editpost:
 *   post:
 *     summary: Edit a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post updated successfully
 *       400:
 *         description: Post edit failed
 *       403:
 *         description: Unauthorized
 */
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

/**
 * @swagger
 * /createpost:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, type]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Post creation failed
 *       403:
 *         description: Unauthorized
 */
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

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get bulletin posts
 *     tags: [Post]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of posts
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by post type (e.g., 'official', 'member')
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 *       403:
 *         description: Members-only content
 *       500:
 *         description: Internal server error
 */
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
    users.forEach((user: any) => {
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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root health check
 *     tags: [Internal]
 *     responses:
 *       200:
 *         description: Server is alive
 */
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
