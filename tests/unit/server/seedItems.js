const Item = require("../../../server/module/items")
const user = require("../../../server/module/user")
const {ObjectID} = require("mongodb")
const faker = require("faker")
const jwt = require("jsonwebtoken")
const config = require("../../../server/config/db")

const seedItems = [
    {
        title:"Test item 1",
        _id: new ObjectID()
    },
    {
        title:"Test item 2",
        _id: new ObjectID
    },

]

const userOne = new ObjectID()
const userTwo = new ObjectID()

const seedUser = [
    {
        _id: userOne,
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        token: jwt.sign({_id: userOne}, config.JWT_SECRETE).toString()
    },
    {
        _id: userTwo,
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        
    }
    
]

const populateItems = async ()=>{
    await Item.deleteMany()
    await Item.insertMany(seedItems)
}

const populateUsers = async ()=>{
    await user.deleteMany()
    await user.insertMany(seedUser)
}

module.exports = { seedItems, populateItems, seedUser,populateUsers};