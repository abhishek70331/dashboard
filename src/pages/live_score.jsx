import React, { useEffect, useState } from "react" 
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "react-bootstrap";


function Live(){

    const[data,setData] = useState([])

    useEffect( () => {
        axios.get("http://127.0.0.1:5000/match")
        .then(response=>{
            setData(response.data)
        })
        .catch(error=>{
            console.log("the error is",error)
        })
    },[])

    const keyOrder = [
        "West Indies 1st Innings",
        "South Africa 1st Innings",
        "Toss",
        "Venue",
        "Date",
        "Time",
        "Umpires",
        "Third Umpire",
        "Match Referee",
        "Match"
    ];


    return(
        <>
        <div className="container">
            <div className="d-flex justify-content-center">
                <h1>Live Score</h1>
            </div>
        </div>
        <div className="container">
            <Card >
                <div className="d-flex justify-content-center">
            <ul>
            {keyOrder.map((key,index)=>(
                data[key] && (
                <li key={index}>
                    <strong>{key}:</strong> {data[key]}
                </li>)
            ))}
            </ul>
            </div>
            </Card>

        </div>

        </>
    )
}

export default Live;