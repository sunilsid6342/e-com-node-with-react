import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const params=useParams();

    useEffect(()=>{

        getProductDetail();
    },[]);
    
    const getProductDetail=async ()=>
    {
        console.log(params.id);
        let result= await fetch("http://localhost:5000/product/"+params.id,{

            headers: {
                authorization: "bearer "+JSON.parse(localStorage.getItem('token'))
            }

        });
        result=await result.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const getValue=async ()=>
    {   
        const uid=params.id;
        console.log(name,price,category,company);
        let result = await fetch("http://localhost:5000/product/"+params.id,{
            method:"PUT",
            body:JSON.stringify({name,price,category,company,uid}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result=await result.json();
        console.log(result);
    }

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" className="inputBox" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter The Name" />
            <input type="text" className="inputBox" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder="Enter The Price" />
            <input type="text" className="inputBox" value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder="Enter The Category" />
            <input type="text" className="inputBox" value={company} onChange={(e) => { setCompany(e.target.value) }} placeholder="Enter The Company" />
            <button className="appButton" onClick={getValue} >Add Product</button>
        </div>
    );
}

export default UpdateProduct;