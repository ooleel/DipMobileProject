// tests/index.test.ts
import request from "supertest";
import app from "../index"; // adjust if your index.ts is in a subfolder

describe("Express Routes", () => {
  test("GET posts and check response", async () => {
    const res = await request(app).get("/posts");
    expect(res.statusCode).toBe(200);
  });
});

describe("Express Routes", () => {
  test("POST /createuser and check response", async () => {
    const body = {
      name: "test",
      email: "test@example.com",
      password: "secret",
    };

    const res = await request(app)
      .post("/createuser")
      .send(body)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
  });
});
describe("Express Routes", () => {
  test("POST /login and check response", async () => {
    const body = {
      email: "test@example.com",
      password: "secret",
    };

    const res = await request(app)
      .post("/login")
      .send(body)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
  });
});
