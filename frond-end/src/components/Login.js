import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth)
        {
            navigate("/");
        }
    })

    const handleLogin= async ()=>
    {
        let result=await fetch("http://localhost:5000/login",{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json",
            }
        });
        result=await result.json();
        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/')
        }
        else{
            alert("Enter the connect detail");
        }
    }

    return (
        
            <div className="div-align">
                <h1 className="h1-align">Sign Up Form</h1>
                <Container fluid="md" className="p-0">
                        <Row>
                            <Col></Col>
                            <Col>
                                <input type="text" className="inputBox" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter The Email"/>
                                <input type="password" className="inputBox" value={password} onChange={(e)=>setPass(e.target.value)} placeholder="Enter The Password"/>
                                <input type="submit" className="appButton" onClick={handleLogin} />     
                            </Col>
                            <Col></Col>
                        </Row>
                </Container>
            </div>

    )
}

export default Login;