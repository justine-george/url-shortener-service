const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /", () => {
  it("should return the index.html file", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.type).toBe("text/html");
  });
});
