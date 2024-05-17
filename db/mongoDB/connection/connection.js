const mg = require('mongoose');
const { User } = require('../models/user');
require("dotenv").config();

const mongoDbConnection = mg.connect(process.env.MONGODB_CONNECTION).then(()=>{
    console.log("Database connection Success")
    const users = [
        { name : 'hinali' , age: 20 , status : true , gender : 'female' },
        { name : 'janvi' , age: 20 , status : true , date: '05/17/2024' , gender : 'female' },
        { name : 'dhruv' , age: 21 , status : true  , gender : 'male' },
        { name : 'divisha' , age: 22 , status : true  , gender : 'female' },
        { name : 'raj' , age: 23 , status : true  ,date: '03/17/2024' , gender : 'male' },
    
    ]
    
    User.insertMany(users);
    
}).catch((err)=>{
console.log(err)
})


module.exports =   mongoDbConnection 