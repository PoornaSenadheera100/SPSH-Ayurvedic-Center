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
            <a href="/buyerhome/myorders"><button className="btn btn-dark">Back</button></a>
            <center><h1>Your Order</h1></center>
    
            <div align="center" style={{ border: '1px solid black', borderRadius: '5px', padding: '20px', maxWidth: '500px', margin: '0 auto', background: '#f8f9fa' }}>
            <table classname="borderless">
            <tr>
                <td><b>Customer Name</b></td>
                <td>  :  </td>
                <td> {name} </td>
            </tr>

            <tr>
                <td><b>Customer Address</b></td>
                <td>  :  </td>
                <td> {address} </td>
            </tr>

            <tr>
                <td><b>Customer NIC</b></td>
                <td>  :  </td>
                <td> {nic} </td>
            </tr>

            <tr>
                <td><b>Customer Phone No.</b></td>
                <td>  :  </td>
                <td> {phone} </td>
            </tr>

            <tr>
                <td><b>Bill Amount</b></td>
                <td>  :  </td>
                <td> Rs.{parseFloat(totAmount).toFixed(2)} </td>
            </tr>

            <tr>
                <td><b>Delivery Agent</b></td>
                <td>  :  </td>
                <td> {delAgent} </td>
            </tr>

            <tr>
                <td><b>Payment Method</b></td>
                <td>  :  </td>
                <td> {paymentMethod} </td>
            </tr>

            <tr>
                <td><b>Payment and Delivery Status</b></td>
                <td>  :  </td>
                <td> {status} </td>
            </tr>

            <tr>
                <td><b>Approval Status</b></td>
                <td>  :  </td>
                <td> {appStatus} </td>
            </tr>



            </table>
            </div>


        </div>
    )
}