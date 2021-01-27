const Item = require('../module/items')

exports.getAllItems = (req,res)=>{
    res.send("It works");
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