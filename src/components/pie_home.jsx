import React, { useEffect,useState } from "react";
import Chart from 'react-apexcharts'
import axios from 'axios'

function PieHome() {

    const [data, setData] = useState([])
    const [category, setCategory] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/toss")
        .then(response => {
            const responseData = response.data
            const labels = Object.keys(responseData)
            const values = Object.values(responseData)
            setData(values)
            setCategory(labels)
            setLoading(false)
        })
        .catch(error => {
            console.error("An error encountered",error)
        })
    },[])

    if (loading){
        return <div>Loading..</div>
    }


    return(
        <>
        <Chart
        type="pie"
        width={350}
        height={250}

        series={data}

        options={{
            labels:category,
            legend:{
                labels:{
                    colors:"white"
                }
            }
        }}

        
        />
        </>
    )
}

export default PieHome