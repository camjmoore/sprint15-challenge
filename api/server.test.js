const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig.js");


const userA = { username: "moe", password: "ghost" };
const userB = { username: "curly", password: "stooge" };

afterAll(async () => {
  await db.destroy();
});

beforeEach(async () => {
  await db.migrate.latest()
})

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
    
    await db.insert(userA).into("users");

    const response = await request(server)
      .post("/api/auth/register")
      .send({ username: "moe", password: "ghost" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "username taken" });
  });
});

describe("[POST] /login", () => {
  it("should require a username and password", async () => {
    const response = await request(server)
      .post("/api/auth/login")
      .send({ username: "", password: "" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "username and password required" });
  });

  it("should return a message if the credentials are invalid", async () => {
    const response = await request(server)
      .post("/api/auth/login")
      .send({ username: "moe", password: "wrong" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "invalid credentials" });
  });
})

describe("[GET] /jokes", () => {
  it("should require a token", async () => {
    const response = await request(server).get("/api/jokes");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "token required" });
  });

  it("should return a list of jokes", async () => {
    try {
      await db.insert(userB).into("users");
    
      const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "curly", password: "stooge" });

      const jokes = await request(server)
        .get("/api/jokes")
        .set("Authorization", login.body.token);

      expect(jokes.status).toBe(200);
      expect(jokes.body).toHaveLength(3);
    } catch (err) {
      console.error(err);
    }
  });
})