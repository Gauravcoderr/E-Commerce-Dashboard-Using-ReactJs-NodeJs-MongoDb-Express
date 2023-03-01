import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, SetCategry] = useState("");
  const [company, setCompany] = useState("");
  //  const[err, SetErr]= useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, [])


  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      headers:{
        authorization :`bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCompany(result.company);
    SetCategry(result.category);
  }




  const updateProduct = async () => {

    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/update/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "content-type": "application/json",
        authorization :`bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json();
    console.warn(result);
    navigate("/");
  }

  return (
    <div className="addProduct">
      <h1> Update Product</h1>
      <input type="text" placeholder="Enter product Name" className="input-box" value={name}
        onChange={(e) => setName(e.target.value)} />



      <input type="text" placeholder="Enter product Price" className="input-box" value={price}
        onChange={(e) => setPrice(e.target.value)} />


      <input type="text" placeholder="Enter product category" className="input-box" value={category}
        onChange={(e) => SetCategry(e.target.value)} />

      <input type="text" placeholder="Enter product company" className="input-box" value={company}
        onChange={(e) => setCompany(e.target.value)} />



      <button onClick={updateProduct} className="appbutton">Update Product</button>
    </div>
  )
}

export default UpdateProduct;