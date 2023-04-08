import axios from "axios"
import { useEffect, useState } from "react"

export default function MyOrders(){

    const buyerEmail = sessionStorage.getItem("buyerEmail");
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8070/order/get/${buyerEmail}`).then((res)=>{
            setOrders(res.data);
            console.log(res.data);
        })
    })


    return(
        <div className="container">
            <a href="/buyerhome"><button className="btn btn-dark">Back</button></a>
            <center><h1>My Orders</h1></center>
        </div>
    )
}