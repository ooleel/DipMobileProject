import { connectToDatabase } from "./mongoClient";
import { ObjectId } from "mongodb";

interface CreatePostInput {
  createdBy: string;
  title: string;
  content: string;
  type: string;
}

interface CreatePostResult {
  success: boolean;
  postId?: ObjectId;
  message?: string;
}

export async function createPost(
  input: CreatePostInput,
  author: string,
): Promise<CreatePostResult> {
  const { createdBy, title, type, content } = input;

  // Basic validation
  if (!createdBy || !title || !content || !type) {
    return { success: false, message: "Missing required fields" };
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    const postsCollection = db.collection("bulletins");

    if (type == "official") {
      const postauthor = await usersCollection.findOne({
        _id: new ObjectId(author),
      });
      if (!postauthor || postauthor.role != "admin") {
        return {
          success: false,
          message: "Only Admin users can create Official posts.",
        };
      }
    }

    const post = {
      createdBy: new ObjectId(author),
      title,
      content,
      type,
      createdAt: new Date(),
    };

    const result = await postsCollection.insertOne(post);

    return {
      success: true,
      postId: result.insertedId,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
