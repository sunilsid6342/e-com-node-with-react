import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name,setName]=useState("");
    const [email,setMail]=useState("");
    const [password,setPass]=useState("");
    const nagate=useNavigate();

    useEffect(()=>{

        const auth=localStorage.getItem("user");
        if(auth)
        {
            nagate("/")
        }
    });

    const getValue=async ()=>
    {
        console.log(name,email,password);
        let result=await fetch("http://localhost:5000/register",{
            method:'POST',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json',
            },
        });
        result= await result.json();
        console.warn(result);
        localStorage.setItem('user',JSON.stringify(result.result))
        localStorage.setItem('token',JSON.stringify(result.auth))
        nagate('/');
        
    }
    return (
        <div>
            <h1 className="h1-align">Sign Up Form</h1>
            <div className="div-align">
                <Container fluid="md" className="p-0">
                    
                        <Row>
                            <Col></Col>
                            <Col>
                                <input type="text" className="inputBox" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter The Name"/>
                                <input type="text" className="inputBox" value={email} onChange={(e)=>setMail(e.target.value)} placeholder="Enter The Email"/>
                                <input type="password" className="inputBox" value={password} onChange={(e)=>setPass(e.target.value)} placeholder="Enter The Password"/>
                                <input type="submit" className="appButton" onClick={getValue} />     
                            </Col>
                            <Col></Col>
                        </Row>
                </Container>
            </div>
        </div>
    )
}

export default SignUp;