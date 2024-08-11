import React,{useState,useEffect} from "react";
import Chart from 'react-apexcharts'
import axios from "axios";

function ScorerHome() {

    const [data,setData] = useState()
    const [category,setCategory] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/scorer")
        .then(response=>{
            const responseData = response.data
            const values = Object.values(responseData)
            const labels = Object.keys(responseData)

            setCategory(labels)
            setData(values)
            setLoading(false)
        })
        .catch(error=>{
            console.log("An error occured",error)
        })
    },[])

    if (loading){
        return <div>Loading..</div>
    }

    return(
        <> 
        <Chart 
            type="bar"
            width={350}
            height={250}
            series={
                [{
                    data:data
                }]
            }
            options={
                {
                    xaxis:{
                        categories:category,
                        labels:{
                            style:{colors:'white',fontSize:'5px'}
                        }
                    },
                    yaxis:{
                        labels:{
                            style:{color:"white"}
                        }
                    }
                }
            }
        />
        </>
    )
}

export default ScorerHome