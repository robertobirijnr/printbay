const Item = require('../module/items')

exports.getAllItems = async(req,res)=>{
    try {
        const items = await Item.find()
        res.status(200).json({items})
    } catch (err) {
        res.status(400).json({message:"No Item found"})
    }
}

exports.createItem = async (req,res) =>{
    const item = new Item(req.body);
    try {
        const doc = await item.save()
        res.status(200).json({item:doc})
    } catch (err) {
        res.status(400).json({message:"Failed"})
    }
}