import { connectToDatabase } from "./mongoClient";
import { ObjectId } from "mongodb";

interface EditPostInput {
  createdBy: string;
  title: string;
  content: string;
  type: string;
  postId: string;
}

interface EditPostResult {
  success: boolean;
  postId?: ObjectId;
  message?: string;
}

export async function editPost(
  input: EditPostInput,
  author: string,
): Promise<EditPostResult> {
  const { createdBy, title, type, content, postId } = input;

  // Basic validation
  if (!createdBy || !title || !content || !type || !postId) {
    return { success: false, message: "Missing required fields" };
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    const postsCollection = db.collection("bulletins");
    const postauthor = await usersCollection.findOne({
      _id: new ObjectId(author),
    });
    const oldpost = await postsCollection.findOne({
      _id: new ObjectId(postId),
    });
    if (!postauthor) {
      return { success: false, message: "Internal Server Error" };
    }
    if (type == "official") {
      if (!postauthor || postauthor.role != "admin") {
        return {
          success: false,
          message: "Only Admin users can edit Official posts.",
        };
      }
    }

    if (!oldpost) {
      return {
        success: false,
        message: "Post does not exist.",
      };
    }

    if (oldpost.createdBy != author && postauthor.role != "admin") {
      return {
        success: false,
        message: "You are unable to edit this post.",
      };
    }

    if (type != "member" && type != "official") {
      return {
        success: false,
        message: "Invalid Post Type.",
      };
    }

    const result = await postsCollection.updateOne(
      { _id: oldpost._id },
      {
        $set: {
          createdBy: new ObjectId(author),
          title: title,
          content: content,
          type: type,
          editedAt: new Date(),
        },
      },
    );

    return {
      success: true,
      message: "Post updated",
      postId: oldpost.id,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
