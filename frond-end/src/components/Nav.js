import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem("user");
    const navgate = useNavigate();
    function logout() {
        localStorage.clear();
        navgate("/signup");

    }
    return (
        <div>
            <img src='https://miro.medium.com/max/1400/1*SwFB1o_k1LGprN-XRUZQ8w.jpeg' alt='logo' className='logo-img' />
            {auth ?
                <ul className="nav-ul">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update/:id">Update Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/signup" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
                : <ul className="nav-ul nav-right">
                    <li><li><Link to="/signup">Sign Up</Link></li><li><Link to="/login">Login</Link></li></li>
                </ul>}
                
            
        </div>
    )
}

export default Nav;