import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Buffer } from 'buffer';

export default function BuyerCart() {
    //session validation
    if (sessionStorage.getItem("sAyurCenReyub") === null) {
        window.location.replace("/buyerlogin");
    }


    //creating variables
    const [items, setItems] = useState([]);

    let history = useHistory();

    const buyerEmail = sessionStorage.getItem("buyerEmail");

    useEffect(() => {
        function getItems() {
            axios.get(`http://localhost:8070/retrieve/${buyerEmail}`).then((res) => {
                console.log(res.data);
                setItems(res.data);
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
        //We reduce 2 here --> because, the last 2 values in the basecode is generally of 2 equal characters.(==)
        imageSource = imageSource.slice(0, imageSource.length - 2);
        return imageSource;
    };

    return (
        <div className="container">
            <div><a type="button" href="/buyerhome" class="btn btn-secondary">Back</a></div>
            <table className="table table-borderless">
                <tr>
                    <th scope="col">Item ID</th>
                    <th scope="col">Supplier ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Image</th>
                </tr>
                <tr scope="row">
                    {items.map((item) => (
                        <div>
                            <td>{item.itemID}</td>
                            <td>{item.supplierId}</td>
                            <td>{item.productName}</td>
                            <td>{item.productQty}</td>
                            <td>{item.price}</td>
                            <td><img src={getImageSource(item.Image)} width="300px" /></td>
                        </div>
                    ))}
                </tr>
            </table>
        </div>
    )
}

