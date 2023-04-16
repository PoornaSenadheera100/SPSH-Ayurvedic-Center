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

    useEffect(()=>{
        axios.get(`http://localhost:8070/seller/get/email/${email}`).then((res)=>{
            setName(res.data[0].name);
            setPhone(res.data[0].phone);
        }).catch((err)=>{
            alert('Network Issue...');
        })
    });

    return(
        <div className="container">
            <a href="/adminhome/managesellers"><button>Back</button></a>
            <center><h1>View Seller</h1></center>

            <div
          style={{
            border: "1px solid black",
            padding: "10px",
            textAlign: "justify",
            backgroundColor: "#f8f8f8",
            borderRadius: "50px",
            height: "200px",
          }}
        >
          <center>
            <br></br>
            <table>
              <tr>
                <td style={{ width: "200px" }}> Name</td>

                <td style={{ width: "200px" }}>:</td>

                <td style={{ width: "200px" }}>{name}</td>
              </tr>

              <tr></tr>

              <tr></tr>
              <tr>
                <td> Email</td>
                <td>:</td>
                <td>{email}</td>
              </tr>
              <tr></tr>
              <tr>
                <td> Phone</td>
                <td>:</td>
                <td>{phone}</td>
              </tr>
            </table>
          </center>
        </div>
        </div>
    )
}