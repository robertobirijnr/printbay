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

exports.userProfile = async(req,res)=>{
    let token;
    try {
        token = req.header("authorization").split(" ")[1]
    } catch (err) {
      return res.status(401).send({message:"Authorization token invalid"})
    }

    try {
       const user = await User.findByToken(token)
       res.send({user})
    } catch (err) {
        res.status(401).send(err)
    }
}