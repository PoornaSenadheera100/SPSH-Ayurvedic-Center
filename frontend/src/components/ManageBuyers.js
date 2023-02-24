import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageBuyers(){

    const [buyers, setBuyers] = useState({});
    
    useEffect(()=>{
        function getBuyers(){
            axios.get("http://localhost:8070/buyer/").then((res)=>{
                console.log(res.data);
                setBuyers(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getBuyers();
    }, [])

    return(
        <div>
            <h1>Manage Buyers here.</h1>
        </div>
    )
}