const mongoose= require("mongoose");

const UserSchema = new mongoose.Schema({
  

    name:String,
    email: String,
    password:String
});




const user= mongoose.model("users", UserSchema);
 module.exports = user;
