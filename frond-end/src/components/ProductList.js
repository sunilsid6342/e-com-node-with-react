import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProduct] = useState([]);


    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        let result = await fetch("http://localhost:5000/product-list", {
            headers: {
                authorization: "bearer "+JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        console.log(result);
        setProduct(result);

    }

    const deleteProduct = async (id) => {
        console.log('http://localhost:5000/product/' + id);
        let result = await fetch('http://localhost:5000/product/' + id, {
            method: 'Delete'
        });
        result = await result.json()
        if (result) {
            alert("Record is deleted.")
            getProduct();
        }
    }

    const getSearch = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch("http://localhost:5000/search/" + key,{
                headers: {
                    authorization: "bearer "+JSON.parse(localStorage.getItem('token'))
                }
            });
            result = await result.json();
            if (result) {
                setProduct(result);
            }
        }
        else {
            getProduct();
        }
    }

    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input type="text" className="inputsearch product-list" onChange={getSearch} placeholder="search product" />
            <ul>
                <li><b>S.no</b></li>
                <li><b>Name</b></li>
                <li><b>Price</b></li>
                <li><b>Category</b></li>
                <li><b>Operation</b></li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button className="buthon-type" onClick={() => deleteProduct(item._id)}>Delete</button>
                            <button className="buthon-type"><Link to={"/update/" + item._id}>Update</Link></button>
                        </li>
                    </ul>
                )
                    : <h3>No result found</h3>
            }
        </div>
    )

}

export default ProductList;