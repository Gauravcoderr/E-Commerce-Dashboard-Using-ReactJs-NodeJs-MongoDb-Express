const mongoose=  require("mongoose");

const ProductSchema = new mongoose.Schema({
  
name:String,
price:Number,
category:String,
userId:String,
company:String

});



const product= mongoose.model("products", ProductSchema);
     module.exports = product;

