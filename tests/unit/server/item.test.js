const expect = require('expect');
const app = require('../../../server')
const Item = require('../../../server/module/items')
const request = require('supertest')
const {seedItems,populateItems} = require("./seedItems");
const {ObjectID} = require("mongodb")

// const add = (x,y) => x + y;

// it("should add two numbers", ()=>{
//     setTimeout(()=>{
//         const result = add(2,3);
//         expect(result).toBe(5);
//         done()
//     },1000)
   
// })

beforeEach(populateItems);


describe("POST /items", ()=>{
    it("should create new item", async ()=>{
        const body = { title:"test title"}
        const res = await request(app)
        .post('/api/items')
        .send(body)
        .expect(200);
    expect(res.body.item.title).toBe(body.title);
   const items = await Item.find()
   expect(items.length).toBe(seedItems.length + 1);
   expect(items[seedItems.length].title).toBe(body.title)

    });

    it("should not create a new item with invalid data", async ()=>{
        await request(app)
        .post('/api/items')
        .send({})
        .expect(400);
        const item = await Item.find();
        expect(item.length).toBe(seedItems.length);
    })
})

describe("GET /items", ()=>{
    it("should get all items", async ()=>{
        const res = await request(app)
        .get('/api/items')
        .expect(200)
        expect(res.body.items.length).toBe(seedItems.length)
    })
})

describe("Get /items/:id",()=>{
    it("should get single item", async ()=>{
        const res = await request(app)
        .get(`/api/items/${seedItems[0]._id.toHexString()}`)
        .expect(200)
        expect(res.body.item.title).toBe(seedItems[0].title)
    });

    it("should return 404 if item not found", async()=>{
        await request(app)
        .get(`/api/items/${new ObjectID().toHexString()}`)
        .expect(404)
    });

    it("should return 404 for invalid Id", async ()=>{
        await request(app)
        .get("/api/items/123")
        .expect(404)
    })

})