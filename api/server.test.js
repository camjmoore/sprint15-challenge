const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig.js");

const testUser = { username: "test", password: "test" };

afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).not.toBe(false);
});

describe("[POST] /register", () => {
  it("should require a username and password", async () => {
    const response = await request(server)
      .post("/api/auth/register")
      .send({ username: "", password: "" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "username and password required",
    });
  });

  it("should return a message if the username is taken", async () => {
    db.insert(testUser).into("users");

    const response = await request(server)
      .post("/api/auth/register")
      .send({ username: "test", password: "test" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "username taken" });
  });
});
