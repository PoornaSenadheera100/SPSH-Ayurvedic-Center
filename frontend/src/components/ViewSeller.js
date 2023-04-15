import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function ViewSeller(){

    if(sessionStorage.getItem("sAyurCenNimda") === null){
        window.location.replace("/adminlogin");
    }
    
    const {email} = useParams();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [delChrg, setDelChrg] = useState();

    useEffect(()=>{
        axios.get(`http://localhost:8070/seller/get/email/${email}`).then((res)=>{
            console.log(res.data);
            setName(res.data[0].name);
            setPhone(res.data[0].phone);
            setDelChrg(res.data[0].delChrg);
        }).catch((err)=>{
            alert('Network Issue...');
        })
    });

    return(
        <div className="container">
            <a href="/adminhome/managesellers"><button>Back</button></a>
            <h1>View Seller</h1>

            Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {name}
            <br></br>
            Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {email}
            <br></br>
            Phone &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {phone}
            <br></br>
            Delivery Charge : Rs.{parseFloat(delChrg).toFixed(2)}
            <br></br>
        </div>
    )
}