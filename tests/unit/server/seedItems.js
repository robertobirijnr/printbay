const Item = require("../../../server/module/items")
const {ObjectID} = require("mongodb")

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

const populateItems = async ()=>{
    await Item.deleteMany()
    await Item.insertMany(seedItems)
}

module.exports = { seedItems, populateItems};