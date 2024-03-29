const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");
const helper = require("../helpers/product.helper");

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


describe("Request GET /api/products", () => {
    test("Returns all products", async () => {
        const res = await request(app).get("/api/products");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    }, 20000) 
})


describe("Request GET /api/products/:id", () => {
    test("Returns one product", async () => {
        const id = 1;
        const res = await request(app).get("/api/products" + id);
        expect(res.statusCode).toBe(200)
        expect(res.body.data.id).toBe(id);
    }, 20000)
})

describe("Request POST /api/products", () => {
    test("Inserts a product", async() => {
        const res = await request(app).post("/api/products")
            .send({
                product: "Guitar",
                cost: "4500",
                description: "Music instrument",
                quantity: 5
            })
            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeTruthy()
    }, 20000)
})

describe("DELETE /api/products", () => {
    test("Deletes a product", async() => {
        const id = 2;
        const res = await request(app).delete("/api/products/" + id)
        expect(res.statusCode).toBe(200);
    }, 20000)
})

