const mongoose = require('mongoose');
const User = require('../../server/module/user')


const data = require('./seed')
const config = require('../../server/config/db');



class DB{
    constructor(){
        this.users = data.users;
        this.models = [User];
    }

    async cleanDb(){
        for(let model of this.models){
            await model.deleteMany({}, ()=>{})
            console.log("data deleted successfully")
        }
    }

    async pushDataToDB(){
        await this.users.forEach(async user =>{
            await (new User(user).save(()=>{}))
        })

        console.log('Database Populated!');
    }

    async seedDB(){
        await this.cleanDb();
        await this.pushDataToDB();
    }

}





//Database connection
mongoose.connect(config.DB_URI_LOCAL, { useNewUrlParser: true ,useUnifiedTopology: true})
  .then(async() => {
      const db = new DB();
      await db.seedDB();
      process.exit(0)
  })
  .catch(err => console.log(err));
  

