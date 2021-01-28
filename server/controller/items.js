const Item = require('../module/items')
const {ObjectID} = require('mongodb')

exports.getAllItems = async(req,res)=>{
    try {
        const items = await Item.find()
        res.status(200).json({items})
    } catch (err) {
        res.status(400).json({message:"No Item found"})
    }
}

exports.getSingleItem = async(req,res)=>{
    if(!ObjectID.isValid){
        return res.status(404).send();
    }
   try {
       const item = await Item.findById(req.params.id)
       if(!item){
           return res.status(404).send()
       }
       res.status(200).json({item})
   } catch (error) {
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