import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function ViewBuyer(){

    if(sessionStorage.getItem("sAyurCenNimda") === null){
        window.location.replace("/adminlogin");
    }
    
    const {email} = useParams();
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
            <a href="/adminhome/managebuyers"><button>Back</button></a>
            <h1>View Buyer</h1>

            Name &nbsp;&nbsp;&nbsp; : {name}
            <br></br>
            address &nbsp; : {address}
            <br></br>
            nic &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {nic}
            <br></br>
            email &nbsp;&nbsp;&nbsp;&nbsp; : {email}
            <br></br>
            phone &nbsp;&nbsp;&nbsp; : {phone}
            <br></br>
        </div>
    )
}