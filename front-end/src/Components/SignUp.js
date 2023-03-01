import React from "react";
import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";


 const SignUp =()=>{
     const[name, setName]= useState("")
     const[email, setEmail]= useState("")
     const[password, setPassword]= useState("")
     const navigate =   useNavigate();
        useEffect(()=>{
            const auth = localStorage.getItem("user");
            if(auth)
            {
                navigate("/");
            }
         },[])
    

const collectData= async ()=>{
console.warn(name,password,email);

//api post  call 

var result = await fetch("http://localhost:5000/register",{

method:"POST",
body:
JSON.stringify({
    name,email,password
}),
headers:{
    "content-type":"application/json"
}


})
result =await result.json();
console.warn(result);

localStorage.setItem("user", JSON.stringify(result.result));

localStorage.setItem("token", JSON.stringify(result.auth));
if(result){
    navigate("/")

}
};


return(
    <div className="register">
    <h1>Register</h1>
    <input  className="input-box" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder=" Enter name" />
    <input  className="input-box" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/>
    <input   className="input-box" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password"/>
    <button className="appbutton" type="button" onClick={collectData}>Sign Up</button>

</div>
 
)

 }
  export default SignUp; 