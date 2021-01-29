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
    res.status(404).json({message:"No Item found"})
   }
}

exports.createItem = async (req,res) =>{
    const {title,artist, image,year,Price} = req.body
    const item = new Item(
        {title,artist, image,year,Price}
        );
    try {
        const doc = await item.save()
        res.status(200).json({item:doc})
    } catch (err) {
        res.status(400).json({message:"Failed"})
    }
}


exports.updateItem = async (req,res)=>{
    try {
        const item = Item.findById(req.params.id)

        if(!item){
            return res.status(404).json({message:"Not found"})
        }
    } catch (err) {
        
    }
}


  exports.deleteItem = async(req,res)=>{
    if(!ObjectID.isValid){
        return res.status(404).send({message:"Invalid id"});
    }
      try {
        const item = await Item.findById(req.params.id)
        if(!item){
            return res.status(404).send({message:"Item not found"})
        }

          await item.deleteOne()
          res.json({message: "Item deleted successfully"})
      } catch (err) {
          res.status(400).json(err)
      }
  }
