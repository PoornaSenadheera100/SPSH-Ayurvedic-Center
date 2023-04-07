import axios from "axios";
import { useEffect, useState } from "react";

export default function Checkout(){

    const [sellers, setSellers] = useState([]);

    const email = sessionStorage.getItem("buyerEmail");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [nic, setNic] = useState("");
    const [phone, setPhone] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("");

    const [delChrg, setDelChrg] = useState("0");
    const netAmount = parseFloat(sessionStorage.getItem("netAmount"));
    let totalAmount = 0;

    const d = new Date();
    const orderRef = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString();

    // alert(newDate.getDate().toString() + newDate.getMonth().toString() + newDate.getFullYear().toString() + newDate.getHours().toString() + newDate.getMinutes().toString() + newDate.getSeconds().toString());
    // alert(orderRef.substring(8, 10) + orderRef.substring(11, 15) + orderRef.substring(16, 18) + orderRef.substring(19, 21) + orderRef.substring(22, 24));

    useEffect(()=>{
        axios.get(`http://localhost:8070/buyer/get/email/${email}`).then((res)=>{
            setName(res.data[0].name);
            setAddress(res.data[0].address);
            setNic(res.data[0].nic);
            setPhone(res.data[0].phone);
        }).catch((err)=>{
            alert('Network Issue...');
        });

        axios.get("http://localhost:8070/seller/").then((res)=>{
                setSellers(res.data);
                console.log(res.data);
            }).catch((err)=>{
                alert(err.message);
        }).then(()=>{
            var select = document.getElementById("delAgents");
            sellers.map((seller)=>{
                var option = document.createElement("option");
                option.text = seller.name;
                option.value = seller.email;
                select.appendChild(option);
            });
        })
    }, sellers[0]);

    function calcTotAmount(){
        totalAmount = netAmount + parseFloat(delChrg);
    }

    function enableCard(res) {
	if(res === 'Credit / Debit Card (Online)') {
        console.log('card');
		document.getElementById("creditCardNo").disabled = false;
		document.getElementById("cvc").disabled = false;
	} else {
		document.getElementById("creditCardNo").disabled = true;
		document.getElementById("cvc").disabled = true;
	}
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

            <b>Select the delivery agent</b> <br/>
            <select id="delAgents"></select> <br/><br/>

            <b>Payment method</b> <br/>
            <select name="paymentMethod" id="paymentMethod" onChange={(e)=>{
                setPaymentMethod(e.target.value);
                enableCard(e.target.value);
            }}>
                <option value="Credit / Debit Card (Online)" id="card" selected>Credit / Debit Card (Online)</option>
                <option value="Cash on Delivery" id="cash">Cash on Delivery</option>
            </select>
            <br/><br/>

            <label for="creditCardNo">Credit Card No : </label> &nbsp;
            <input type="text" id="creditCardNo"></input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label for="cvc">CVC : </label> &nbsp;
            <input type="number" id="cvc"></input>

            <br/>
            <br/>
            <a className="btn btn-success">Confirm</a>



        </div>
    )
}