const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");
const helper = require("../helpers/user.helper");

require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => { console.log("Connection to MongoDB established")},
        err => { console.log("Failed to connect to Database", err)}
    )
});

afterEach(async () => {
    await mongoose.connection.close()
});

describe("Request GET /api/users", () => {
    test("Returns all users", async () => {
        const res = await request(app).get("/api/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    }, 20000) 
})

describe("Request GET /api/users/:username", () => {
    test("Returns a user", async () => {
        const result = await helper.findLastInsertedUser();
        console.log(result);

        const res = await request(app).get("/api/users/" + result.username);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.username).toBe(result.username);
        expect(res.body.data.email).toBe(result.email);
    }, 20000)
})

describe("Request POST /api/users", () => {
    test("Creates a user", async () => {
        const res = await request(app)
        .post("/api/users")
        .send({
            username: "testUser",
            password: "123456",
            name : "Albert",
            surname: "Einstein",
            email: "AlbertE@example.gr"
        })
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeTruthy();
    }, 20000)
})