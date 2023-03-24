import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Buffer } from 'buffer';

export default function HomeBuyer() {
    //session validation
    if (sessionStorage.getItem("sAyurCenReyub") === null) {
        window.location.replace("/buyerlogin");
    }

    //Creating variables 
    const [items, setitems] = useState([]);
    // const [count, setCount] = useState(1);
    let history = useHistory();

    const buyerEmail = sessionStorage.getItem("buyerEmail");


    useEffect(() => {
        function getItems() {
            axios.get("http://localhost:8070/item/").then((res) => {
                console.log(res.data);
                setitems(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getItems();

    }, [])

    //Get the image source.
    const getImageSource = (imageData) => {

        //Converting the String to an image happens here.
        let imageSource = `data:image/png;base64,${Buffer.from(imageData.data).toString('base64').substring(19)}`;
        //Hilarina (0,3) --> Hil
        //We reduce 2 here --> because, the last 2 values in the basecode is generally of 2 equal characters.(==)
        imageSource = imageSource.slice(0, imageSource.length - 2);
        return imageSource;
    };



    return (
        <div className="container">
            {/* session used to handle the login  */}
            <a href="/" onClick={() => {
                sessionStorage.removeItem("sAyurCenReyub");
                sessionStorage.removeItem("buyerEmail");
            }}><button>Signout</button></a>

            {/* Adding a cart image  */}
            <div style={{ float: "right" }}>
                <a href="/BuyerViewItem"> <img style={{ width: 50, height: 50 }} src="cart.gif" /></a>
            </div>

            <div>
                <center><h1>All featured items</h1></center>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '5rem' }}>

                    {items.map((item) => (

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', border: '1px solid #ccc' }} key={item.ProductId}>
                            <img src={getImageSource(item.Image)} style={{ maxWidth: '100%' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.Name}</h3>
                                <p style={{ marginBottom: '0.5rem', textAlign: 'center' }}>{item.Description}</p>
                                <span style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Rs.{item.Price}</span>
                                {/* <a href="/BuyerViewItem"><button style={{ padding: '0.5rem', backgroundColor: '#008CBA', color: 'white', border: 'none', cursor: 'pointer' }}>View</button></a> */}
                                <button className="btn btn-success" onClick={() => {
                                    window.location.replace(`http://localhost:3000/buyer/view/item/${item.ProductId}`);
                                }}>View</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>


    )
}



/*return(
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

        
    ) */