const express  = require("express");
const mongoose = require("mongoose");
const User = require("./Models/User");

 const Jwt = require("jsonwebtoken");
  const Jwtkey ="e-comm"

const cors = require("cors");

const  Product = require("./Models/Product");

const app = express();

mongoose.set('strictQuery', false);

// for connection to database

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce").then(()=>{
    console.log("mongodb connected")
}).catch(()=>{
    
    console.error("cannot connect mongodb");
    process.exit(1);

});


app.use(express.json());
app.use(cors());


      // register api

app.post("/register", verifyToken, async (req, resp) => {
    let user = new User(req.body);

    let result = await user.save()
    result = result.toObject();
       delete result.password;
       Jwt.sign({result},Jwtkey, {expiresIn:"2h"},(err,token)=>{
        if(err){
          resp.send({result:"Something went wrong, please try after sometime"})
        }

              resp.send({result, auth:token});
           })
    
    resp.send(result);

})

// //login api

app.post("/login", async (req, resp) => {

    console.log("login", req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
             Jwt.sign({user},Jwtkey, {expiresIn:"2h"},(err,token)=>{
          if(err){
            resp.send({result:"Something went wrong, please try after sometime"})
          }

                resp.send({user, auth:token});
             })
      

        }
        else {
            resp.send({ result: "Not FOund" });
        }


    }
    else {
        resp.send({ result: "Not FOund" });
    }
});

//  //add product api

 app.post("/add", verifyToken, async (req, resp)=>{
    console.warn("add",req.body)
     let product =new Product(req.body);
     let result =await product.save();

     resp.send(result);

 })

 // product list api

  app.get("/products", verifyToken, async (req, resp)=>{
    let products =  await Product.find();
     if(products.length>0){
         resp.send(products);

     }
     else{
        resp.send({result:"No result found"});
     }
     

  });
    

  //delete api

  app.delete("/product/:id", verifyToken, async (req, resp)=>{

     const result = await  Product.deleteOne({_id:req.params.id});

     resp.send(result);


  })


  // get product by id

   app.get("/product/:id", verifyToken, async(req, resp)=>{
 
    let result =  await Product.findOne({_id:req.params.id});

   if(result){
    resp.send(result);
   }
   else{
    resp.send("RESULT NOT FOUND")
   }
   })


//update product api


app.put("/update/:id", verifyToken, async(req, resp)=>{

    let result = await Product.updateOne(
        {_id:req.params.id},
        { $set:req.body}
        )
         resp.send(result);



});

// search api
 app.get("/search/:key", async(req, resp)=>{
     let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            


        ]
     })
     resp.send(result);
 })

 //middleware


 function verifyToken ( req, resp , next){
     let  token  = req.headers["authorization"];
      if(token){
        token = token.split(" ")[1];
         console.warn("middleware if", token)
         Jwt.verify(token,Jwtkey, (err, valid)=>{
      if(err){
    resp.status(401).send({result:"Please  provide token with header"})
             }
      else{
           next();
          }
    
        })
      }
       else{
resp.status(403).send({result:"Please add token with header"})
       }
// console.warn("middlware called", token)


 }

app.listen(5000,()=>{
    console.warn("Running on port")
});
