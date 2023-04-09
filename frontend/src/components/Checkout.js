import axios from "axios";
import { useEffect, useState } from "react";

export default function Checkout(){

    const [sellers, setSellers] = useState([]);

    const email = sessionStorage.getItem("buyerEmail");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [nic, setNic] = useState("");
    const [phone, setPhone] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

    const [delChrg, setDelChrg] = useState("0");
    const netAmount = parseFloat(sessionStorage.getItem("netAmount"));
    let totalAmount = 0;

    const [delAgent, setDelAgent] = useState("");

    const [cardNo, setCardNo] = useState("");
    const [cvc, setCvc] = useState("");

    const [status, setStatus] = useState("Not Paid. Not Delivered.");

    const d = new Date();
    const orderRef = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString();

    const appStatus = "Pending";

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
                setDelAgent(res.data[0].email);
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

    function setStatusValue(paymentMethod){
        if (paymentMethod === "Credit / Debit Card (Online)") {
            setStatus("Paid. Not Delivered.");
        } else {
            setStatus("Not Paid. Not Delivered.");
        }
    }

    function proceedToCheckout(){
        if (paymentMethod === "Credit / Debit Card (Online)" && (cvc == '' || cardNo == '')){
            alert("Credit Card details are required!");
        } else {
            const newOrder = {
                orderRef,
                email,
                name,
                phone,
                address,
                nic,
                totalAmount,
                delAgent,
                paymentMethod,
                status,
                appStatus
            }
            axios.post("http://localhost:8070/order/add", newOrder).then((req, res)=>{
                alert("Order Submitted Successfully");
                axios.delete(`http://localhost:8070/ShoppingCart/delete/${email}`);
                window.location.replace("http://localhost:3000/buyerhome")
            }).catch((err)=>{
                alert(err);
            })
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
            <select id="delAgents" onChange={(e)=>{
                setDelAgent(e.target.value);
            }}></select> <br/><br/>

            <b>Payment method</b> <br/>
            <select name="paymentMethod" id="paymentMethod" onChange={(e)=>{
                setPaymentMethod(e.target.value);
                enableCard(e.target.value);
                setStatusValue(e.target.value);
            }}>
                <option value="Cash on Delivery" id="cash" selected>Cash on Delivery</option>
                <option value="Credit / Debit Card (Online)" id="card">Credit / Debit Card (Online)</option>
            </select>
            <br/><br/>

            <label for="creditCardNo">Credit Card No : </label> &nbsp;
            <input type="text" id="creditCardNo" disabled onChange={(e)=>{
                setCardNo(e.target.value);
            }}></input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label for="cvc">CVC : </label> &nbsp;
            <input type="number" id="cvc" disabled onChange={(e)=>{
                setCvc(e.target.value);
            }}></input>

            <br/>
            <br/>
            <a className="btn btn-success" onClick={proceedToCheckout}>Confirm</a>



        </div>
    )
}