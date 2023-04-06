import axios from "axios";
import { useEffect, useState } from "react";

export default function Checkout(){

    const email = sessionStorage.getItem("buyerEmail");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [nic, setNic] = useState("");
    const [phone, setPhone] = useState("");

    const [delChrg, setDelChrg] = useState("0");
    const netAmount = parseFloat(sessionStorage.getItem("netAmount"));
    let totalAmount = 0;

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

    function calcTotAmount(){
        totalAmount = netAmount + parseFloat(delChrg);
    }

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
            
            <b>Net Amount</b> : Rs.{netAmount} <br/>
            <b>Delivery Charge</b> : Rs.{parseFloat(delChrg).toFixed(2)} <br/>
            {calcTotAmount()}
            <b>Total Amount</b> : Rs.{parseFloat(totalAmount).toFixed(2)} <br/><br/>

            <b>Select the delivery agent</b> <br/><br/>

            <b>Payment method</b> <br/>
            <select name="paymentMethod" id="paymentMethod">
                <option value="card">Credit / Debit Card (Online)</option>
                <option value="cash">Cash on Delivery</option>
            </select>

            <br/>
            <br/>
            <a className="btn btn-success">Confirm</a>



        </div>
    )
}