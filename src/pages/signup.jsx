import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from 'axios'

function Signup() {

    const [formData, setformData] = useState({
        name : "",
        email : "",
        age: "",
        gender:"",
        password:""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name,value} = e.target;
        setformData({
            ...formData,
            [name]:value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://127.0.0.1:5000/signup",formData,
                {
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            )
            const message = response.data.message;
            if (message=="user Created"){
                alert("Signup successful")
                navigate("/login")
            } else{
                alert("unsuccessful")
            }
        } catch (error) {
            console.log("the error is",error)
        }

    }

    return(
        <>
        <div className="container making">
            <div className="d-flex">

            <Card className="card-content" bg="dark">
                <h3 className="d-flex justify-content-center text-white"><strong>Signup</strong></h3>
            
            <form onSubmit={handleSubmit}>

                <div className="mt-3">
                <label className="text-white">Name</label>
                <br />
                <input className="input-text" type="text" name="name" value={formData.name}  onChange={handleChange} placeholder="Full name" required/>
                </div>

                <div className="mt-3">
                <label className="text-white">Email</label>
                <br />
                <input className="input-text" type="email" name="email" value={formData.email}  onChange={handleChange} placeholder="email" required/>
                </div>

                <div className="mt-3">
                <label className="text-white">Age</label>
                <br />
                <input className="input-text" type="number" name="age" value={formData.age}  onChange={handleChange} placeholder="age" required/>
                </div>

                <div className="mt-3">   
                <label className="text-white">Gender</label>
                <br />
                <select className="input-text" name="gender" value={formData.gender} onChange={handleChange} required>
                    <option>Select Option</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                </div>

                <div className="mt-3">
                <label className="text-white">Password</label>
                <br />
                <input className="input-text" type="password" name="password" placeholder="password" value={formData.value} onChange={handleChange} required />
                </div>

                <div className="mt-3 d-flex justify-content-center">
                <button type="submit" className="but"><strong>Submit</strong></button>
                </div>
            </form>
            </Card>
            </div>
        </div>
        </>
    )
}

export default Signup;