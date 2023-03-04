import React ,{useState,useEffect} from "react";
import axios from "axios";
import { useHistory} from "react-router-dom";

export default function HomeBuyer(){
//session validation
    if(sessionStorage.getItem("sAyurCenReyub") === null){
        window.location.replace("/buyerlogin");
    }

    useEffect(()=>{
        function getItems(){
            axios.get("http://localhost:8070/leave/").then((res)=>{
                console.log(res.data);
                setLeaves(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getLeaves();

    },[])



    return(
        <div>
            <a href="/" onClick={()=>{
                sessionStorage.removeItem("sAyurCenReyub");
            }}><button>Signout</button></a>
            
            <h1>Welcome to Buyer Home</h1>
        </div>
    )
}