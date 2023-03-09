import React ,{useState,useEffect} from "react";
import axios from "axios";
import { useHistory} from "react-router-dom";

export default function HomeBuyer(){
    //session validation
    if(sessionStorage.getItem("sAyurCenReyub") === null){
        window.location.replace("/buyerlogin");
    }

    //Creating variables 
    const [items,setitems]=useState([]);
    const [count,setCount]=useState(1);
    let history = useHistory();

    const buyerEmail = sessionStorage.getItem("buyerEmail");


    useEffect(()=>{
        function getItems(){
            axios.get("http://localhost:8070/item/").then((res)=>{
                console.log(res.data);
                setitems(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getItems();

    },[])
 

    return(
        <div>
            <a href="/" onClick={()=>{
                sessionStorage.removeItem("sAyurCenReyub");
                sessionStorage.removeItem("buyerEmail");
            }}><button>Signout</button></a>
            
            <h1>Welcome to Buyer Home</h1>

            <div>
            <center><h1>All featured items</h1></center>
            <div class="p-3 border bg-light">
            {
                    
                    items.map((item)=>(
                                
                        item.ProductId,
                        item.Name,
                        item.Description,
                        item.Price,
                        item.Quantity,
                        <input type={'number'} value={count} onChange={(e)=>{
                            setCount(e.target.value);
                        }} ></input>,
                        <button>Add cart</button>
                    ))
                    }
            </div>
            
           </div>
        </div>

        
    )
}