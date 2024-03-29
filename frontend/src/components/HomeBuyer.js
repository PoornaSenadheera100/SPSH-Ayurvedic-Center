import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import Button from 'react-bootstrap/Button';

import { Buffer } from 'buffer';

export default function HomeBuyer() {
    // Session validation - if the session doesn't exist, redirect the user to the buyer login page
    if (sessionStorage.getItem("sAyurCenReyub") === null) {
        window.location.replace("/buyerlogin");
    }

    //Creating variables 
    const [items, setitems] = useState([]);
    let history = useHistory();

    // Get the buyer email from session storage
    const buyerEmail = sessionStorage.getItem("buyerEmail");

    const [avgRatings, setAvgRatings] = useState({});

    // Use the useEffect hook to fetch data from API when the component mounts
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

        // Fetch ratings data and calculate average ratings using the getAverageRatings function
        axios.get("http://localhost:8071/rate").then((res)=>{
            setAvgRatings(getAverageRatings(res.data));
            console.log(getAverageRatings(res.data)['P002']);
        })
    }, [])

    //Get the image source.
    const getImageSource = (imageData) => {

        //Converting the String to an image happens here.
        let imageSource = `data:image/png;base64,${Buffer.from(imageData.data).toString('base64').substring(19)}`;

        //We reduce 2 here --> because, the last 2 values in the basecode is generally of 2 equal characters.(==)
        imageSource = imageSource.slice(0, imageSource.length - 2);
        return imageSource;
    };

    // Function to calculate average ratings for each item using the ratings data fetched from the API
    function getAverageRatings(arr) {
        const itemMap = new Map();
        const result = {};

        arr.forEach((obj) => {
          if (!itemMap.has(obj.itemID)) {
            itemMap.set(obj.itemID, [obj.rate]);
          } else {
            itemMap.get(obj.itemID).push(obj.rate);
          }
        });
        
        itemMap.forEach((value, key) => {
          const sum = value.reduce((acc, curr) => acc + curr, 0);
          const avg = sum / value.length;
          result[key] = avg;
        });
        
        return result;
    }

    // Render the HomeBuyer component
    return (
        <div className="container">
            {/* session used to handle the login  */}
            <a href="/" onClick={() => {
                sessionStorage.removeItem("sAyurCenReyub");
                sessionStorage.removeItem("buyerEmail");
            }}>
            
            {/*Buttons*/}
            <Button variant="danger">Signout</Button></a>
            
            {/* space between two buttons  */}
             {' '}

            <a href="/buyerhome/myorders"><Button variant="success">My Orders</Button></a>

            {/* Adding a cart image  */}
            <div style={{ float: "right" }}>
                <a href="/buyer/view/cart"> <img style={{ width: 50, height: 50 }} src="cart.gif" /></a>
            </div>

            <div>
                <center><h1>All featured items</h1></center>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '5rem' }}>

                    {items.map((item) => (

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', border: '1px solid #ccc' }} key={item.ProductId}>
                            <img src={getImageSource(item.Image)} style={{ maxWidth: '100%' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.Name}</h3>
                                <p style={{ marginBottom: '0.5rem', textAlign: 'center' }}>{item.Description}</p>
                                <span style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Rs.{item.Price}</span>
                                
                                <Rater total={5} rating={avgRatings[item.ProductId]} interactive={false} style={{ fontSize: '30px' }}/>
                                <button className="btn btn-success" onClick={() => {
                                    window.location.replace(`http://localhost:3000/buyer/view/item/${item.ProductId}`);
                                }}>View</button>
                                <br/>
                                {item.Quantity === 0 && <p style={{ color: 'red' }}>Out of Stock</p>}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>


    )
}