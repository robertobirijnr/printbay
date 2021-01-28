const User = require('../module/user')


exports.registerUser = async(req,res)=>{
    const user = new User(req.body)
    try {
        const doc = await user.save();
        res.send({user: doc})
    } catch (err) {
        res.status(400).send(err)
    }
}