import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';

export default function SingleOrder(){

    if (sessionStorage.getItem("sAyurCenReyub") === null) {
        window.location.replace("/buyerlogin");
    }

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
        axios.get(`http://localhost:8070/order/getbyref/${orderRef}`).then((res)=>{
            console.log(res.data[0]);
            setName(res.data[0].buyername);
            setAddress(res.data[0].buyeraddress);
            setNic(res.data[0].buyernic);
            setPhone(res.data[0].buyerphone);
            setDelAgent(res.data[0].deliveryagent);
            setAppStatus(res.data[0].appStatus);
            setPaymentMethod(res.data[0].paymentmethod);
            setStatus(res.data[0].status);
            setTotAmount(res.data[0].totalamount);
        })
    }, []);

    return(
        <div className="container">
            <a href="/buyerhome/myorders"><Button className="btn btn-dark">Back</Button></a>
            <center><h1>Your Order</h1></center>
            
            <b>Customer Name</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {name}<br/>
            <b>Customer Address</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {address}<br/>
            <b>Customer NIC</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {nic}<br/>
            <b>Customer Phone No.</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {phone}<br/>
            <b>Bill Amount</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {totAmount}<br/>
            <b>Delivery Agent</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {delAgent}<br/>
            <b>Payment Method</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {paymentMethod}<br/>
            <b>Payment and Delivery Status</b> : {status}<br/>
            <b>Approval Status</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {appStatus}
        </div>
    )
}