import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Buffer } from 'buffer';

export default function BuyerCart(){
    //session validation
    if (sessionStorage.getItem("sAyurCenReyub") === null) {
        window.location.replace("/buyerlogin");
    }


    //creating variables
    const [items, setItems] = useState([]);

    let history = useHistory();

    const buyerEmail = sessionStorage.getItem("buyerEmail");

    useEffect(() => {
        function getItems(){
            axios.get("http://localhost:8070/")
        }
    })

    return{

    }
}

