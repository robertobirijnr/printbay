const User = require('../module/user')


exports.registerUser = async(req,res)=>{
    const {name,email,password} = req.body
    const user = new User({name,email,password})
    try {
        const doc = await user.save();
        const token = await doc.generateAuthToken();
        res
        .header("authorization",`Bearer ${token}`)
        .json({user: doc})
    } catch (err) {
        res.status(400).send(err)
    }
}