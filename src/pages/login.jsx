import React,{useState,useEffect} from "react";
import axios from 'axios'
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {

    const [formData,setformData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = e => {
        const {name,value} = e.target
        setformData({
            ...formData,
            [name]:value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://127.0.0.1:5000/login",formData,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const message = response.data.message;
            if (message=="login Successful"){
                alert("login successful")
                navigate("/")
            }else{
                alert("unsuccessful")
            }
        }catch (error) {
            alert("the error is", error)
        }
    }

    return(
        <>
        <div className="container down">
            <div className="d-flex justify-content-center">
                <Card bg="dark" className="p-3 aligning">
                    <div className="mt-2 d-flex justify-content-center">
                        <h3 className="text-white"><strong>Login</strong></h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <label className="text-white">Email</label>
                        <br />
                        <input className="backsee" type="email" placeholder="Email" onChange={handleChange} name="email"/>
                    </div>
                    <div className="mt-3">
                        <label className="text-white">Password</label>
                        <br />
                        <input className="backsee" type="password" placeholder="Password" onChange={handleChange} name="password"/>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="but" >Submit</button>
                    </div>
                    </form>
                </Card>
            </div>
        </div>
        </>
    )
}

export default Login;