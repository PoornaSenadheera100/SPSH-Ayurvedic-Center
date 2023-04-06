import axios from "axios";
import { useEffect, useState } from "react";

export default function Checkout(){

    const email = sessionStorage.getItem("buyerEmail");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [nic, setNic] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(()=>{
        axios.get(`http://localhost:8070/buyer/get/email/${email}`).then((res)=>{
            setName(res.data[0].name);
            setAddress(res.data[0].address);
            setNic(res.data[0].nic);
            setPhone(res.data[0].phone);
        }).catch((err)=>{
            alert('Network Issue...');
        })
    });

    return(
        <div className="container">
            <a type="button" href="/buyer/view/cart" class="btn btn-secondary">Back</a>
            <h1>Checkout page</h1>
            <b>Your Details</b><br/>
            Name : {name} <br/>
            Address : {address} <br/>
            NIC : {nic} <br/>
            Email : {email} <br/>
            Phone : {phone} <br/><br/>
            
            <b>Total Amount</b> : <br/>
            <b>Delivery Charge</b> : <br/><br/>

            Select the delivery agent

            Payment method
            Credit / Debit Card (Online)
            Cash on Delivery



        </div>
    )
}