const faker = require('faker')

module.exports ={
    "users" :[
        {
            name:faker.name.findName(),
            email:'admin@gmail.com',
            password:'test@12345',
            role:'admin'
        },
        {
            name:faker.name.findName(),
            email:'user@gmail.com',
            password:'test@12344'
        }
    ]
}


