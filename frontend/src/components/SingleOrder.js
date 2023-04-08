import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function SingleOrder(){

    const {orderRef} = useParams();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [nic, setNic] = useState("");
    const [phone, setPhone] = useState("");
    const [delAgent, setDelAgent] = useState("");
    const [appStatus, setAppStatus] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [status, setStatus] = useState("");
    const [totAmount, setTotAmount] = useState("");

    useEffect(()=>{

    })

    return(
        <div className="container">
            <a href="/buyerhome/myorders"><button className="btn btn-dark">Back</button></a>
            <center><h1>Your Order</h1></center>
            
        </div>
    )
}