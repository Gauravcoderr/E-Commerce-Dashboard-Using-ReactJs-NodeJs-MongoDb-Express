import React, { useState } from "react";
const AddProduct =()=>{
     const[name, setName]=useState("");
     const[price, setPrice]=useState("");
     const[category, SetCategry]=useState("");
     const[company, setCompany]= useState("");
     const[err, SetErr]= useState(false);

      const addProduct= async ()=>{

        console.log("Add",name,price,category,company);

        if(!name  || !price  || !category  || !company)
        {
            SetErr(true);
            return false;
        }

        const userId = JSON.parse( localStorage.getItem("user"))._id
         let result= fetch("http://localhost:5000/add",{
            method:"POST",
            body:JSON.stringify({name,price,category,company, userId}),
            headers:{
                "content-type":"application/json",
                authorization :`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
 });
   result= await result.json();
 console.warn(result);
      }
    return(
        <div className="addProduct">
            <h1>Add Product</h1>
            <input type ="text" placeholder="Enter product Name" className="input-box" value={name}
            onChange={(e)=>setName(e.target.value)}/>

            { err  && !name && <span className="invalid-input">Enter valid name</span>} 

            <input type ="text" placeholder="Enter product Price"className="input-box" value={price}
             onChange={(e)=>setPrice(e.target.value)}/>
                { err  && !price && <span className="invalid-input">Enter valid Price</span>} 

            <input type ="text" placeholder="Enter product category"className="input-box" value={category}
             onChange={(e)=>SetCategry(e.target.value)}/>
                { err  && !category && <span className="invalid-input">Enter valid category</span>} 
            <input type ="text" placeholder="Enter product company" className="input-box" value={company}
             onChange={(e)=>setCompany(e.target.value)}/>
                { err  && !company && <span className="invalid-input">Enter valid  company</span>} 


            <button  onClick={addProduct}  className="appbutton">Add Product</button>
            </div>
    )
}

 export default AddProduct;