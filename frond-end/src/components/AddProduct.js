import React from "react";

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const [image,setImage]=React.useState('');
    
    const getValue = async () => {
        
        if (!name || !price || !category || company) {
            setError(true);
            
        }
        
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        console.log(name, price, category, userId, company,image);
        const formData=new FormData();
        formData.append('name',name);
        formData.append('price',price);
        formData.append('category',category);
        formData.append('userId',userId);
        formData.append('company',company);
        formData.append('images',image)
        let datas = JSON.stringify({ name, price, category, userId, company });
        let result = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            body: formData,
            headers: {
                
                authorization: "bearer "+JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        console.log(result)
    }

    return (
        <div className="product">
            <h1>Add Product</h1>
            <input type="text" className="inputBox" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter The Name" />
            {error && !name && <span className="valid-tag">Enter valid name</span>}
            <input type="text" className="inputBox" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder="Enter The Price" />
            {error && !price && <span className="valid-tag">Enter valid price</span>}
            <input type="text" className="inputBox" value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder="Enter The Category" />
            {error && !category && <span className="valid-tag">Enter valid category</span>}
            <input type="text" className="inputBox" value={company} onChange={(e) => { setCompany(e.target.value) }} placeholder="Enter The Company" />
            {error && !company && <span className="valid-tag">Enter valid company</span>}
            <input type="file" className="inputBox" onChange={(e) => { setImage(e.target.files) }} placeholder="Enter The Company" />
            {error && !company && <span className="valid-tag">Enter valid image</span>}
            <button className="appButton" onClick={getValue} >Add Product</button>
        </div>
    );
}

export default AddProduct;