
const mongoose =require('mongoose')

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    pass:String,
    age:Number,
    city:String
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema)

module.exports={UserModel}




//Dummy data


// {
//     "name":"Deepak",
//     "email":"deepak123@gmail.com",
//     "pass":"deepak123",
//     "gender":"male",
//     "age":23,
//     "city":"Bhopal"
// }