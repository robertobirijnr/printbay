const expect = require('expect');
const app = require('../../../server')
const User = require('../../../server/module/user')
const request = require('supertest')
const {seedUser,populateUsers} = require("./seedItems");
const {ObjectID} = require("mongodb")
const faker = require('faker');


before(populateUsers)


describe("GET /users",()=>{
    it("should return userProfile if authenticated", async ()=>{
        const res = await request(app)
        .get("/api/users/user-profile")
        .set("authorization",`Bearer ${seedUser[0].token}`)
        .expect(200);
        expect(res.body.user._id).toBe(seedUser[0]._id.toHexString());
    });

    it("should return 401 if not authenticated", async ()=>{
        const res = await request(app)
        .get("/api/users/user-profile")
        .expect(401);
        expect(res.body.user).toBeUndefined();
    })
})

describe("POST /users",()=>{
    it("should register new user", async ()=>{
        const user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        }
        const res = await request(app)
        .post('/api/users/register')
        .send(user)
        .expect(200)
        expect(res.header.authorization).toBeDefined()
        expect(res.body.user.email).toBe(user.email);
        const doc = await User.findOne({email: user.email})
        expect(doc).toBeTruthy()
        expect(doc.password).not.toBe(user.password)
    });

    it("should not register user with invalid data", async ()=>{
        await request(app)
        .post("/api/users/register")
        .send({})
        .expect(400)
        const user = await User.find()
        expect(user.length).toBe(3)
    });

    it("should not register new user if email already exist", async ()=>{
        await request(app)
        .post("/api/users/register")
        .send(seedUser[0])
        .expect(400)
        const users = await User.find();
        expect(users.length).toBe(3)
    })
})