import request from "supertest";
import { generateToken } from "../auth/jwt";
import { connectToDatabase } from "../functions/mongoClient";
import { ObjectId, Db } from "mongodb";
import app from "../index";

let db: Db;
let aliceToken: string;
let bobToken: string;
let aliceId: string;
let bobId: string;

beforeAll(async () => {
  db = await connectToDatabase();

  const alice = await db
    .collection("users")
    .findOne({ email: "alice@example.com" });
  const bob = await db
    .collection("users")
    .findOne({ email: "bob@example.com" });

  if (!alice || !bob) {
    throw new Error("Seeded users not found");
  }

  aliceId = alice._id.toString();
  bobId = bob._id.toString();

  aliceToken = generateToken({ userId: aliceId, email: "alice@example.com" });
  bobToken = generateToken({ userId: bobId, email: "bob@example.com" });
});

describe("Seeded API Routes", () => {
  it("POST /login - logs in as Alice", async () => {
    const res = await request(app).post("/login").send({
      email: "alice@example.com",
      password: "secret",
    });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it("GET /user/profile - gets Alice's profile", async () => {
    const res = await request(app)
      .get("/user/profile")
      .set("Authorization", aliceToken);

    expect(res.status).toBe(200);
    expect(res.body.user.name).toBe("Alice");
    expect(res.body.user.email).toBe("alice@example.com");
  });

  it("GET /posts - gets official posts without auth", async () => {
    const res = await request(app).get("/posts").query({ type: "official" });

    expect(res.status).toBe(200);
    expect(res.body.posts.length).toBeGreaterThan(0);
    expect(
      res.body.posts.every((p: { type: string }) => p.type === "official"),
    ).toBe(true);
    expect(res.status).toBe(200);
  });

  it("GET /posts - gets member posts with auth", async () => {
    const res = await request(app)
      .get("/posts")
      .set("Authorization", bobToken)
      .query({ type: "member" });

    expect(res.status).toBe(200);
    expect(res.body.posts.length).toBeGreaterThan(0);
    expect(
      res.body.posts.every((p: { type: string }) => p.type === "member"),
    ).toBe(true);
  });

  it("GET /posts - fails to get member posts without auth", async () => {
    const res = await request(app).get("/posts").query({ type: "member" });

    expect(res.status).toBe(500);
    //expect(res.body.message).toBe("This option is only available to members.");
  });

  it("GET /users - returns seeded users", async () => {
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(
      res.body.users.some(
        (u: { email: string }) => u.email === "alice@example.com",
      ),
    ).toBe(true);
    expect(
      res.body.users.some(
        (u: { email: string }) => u.email === "bob@example.com",
      ),
    ).toBe(true);
  });

  it("GET / - root route works", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Request Succeeded");
  });

  it("GET /test - verifies valid token", async () => {
    const res = await request(app)
      .get("/test")
      .set("Authorization", aliceToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("success");
  });

  it("POST /createpost - creates a post as Alice", async () => {
    const res = await request(app)
      .post("/createpost")
      .set("Authorization", aliceToken)
      .send({
        title: "Test Post by Alice",
        content: "This is a test post",
        type: "official",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Post created successfully");
  });

  it("POST /editpost - edits a bulletin as Bob", async () => {
    const post = await db
      .collection("bulletins")
      .findOne({ createdBy: new ObjectId(bobId) });

    const res = await request(app)
      .post("/editpost")
      .set("Authorization", bobToken)
      .send({
        postId: post?._id.toString(),
        title: "Updated Title",
        content: "Updated content",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Post updated successfully");
  });
});
