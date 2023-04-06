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
    let total = 0;

    useEffect(() => {
        console.log(buyerEmail);
        function getItems() {
            axios.get(`http://localhost:8070/ShoppingCart/retrieve/${buyerEmail}`).then((res) => {
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

    function calcNetValue(qty, price){
        total = total + (qty * price);
    }

    function proceedToCheckout(e){
        e.preventDefault();

        if (total === 0){
            alert("Please add items before checkout!");
        } else {
            window.location.replace("http://localhost:3000/buyer/view/cart/checkout");
        }
    }

    return (
        <div className="container">
            <div><a type="button" href="/buyerhome" class="btn btn-secondary">Back</a></div>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">Item ID</th>
                        <th scope="col">Supplier ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Image</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={buyerEmail}>
                            <td>{item.itemID}</td>
                            <td>{item.supplierId}</td>
                            <td>{item.productName}</td>
                            <td>{item.productQty}</td>
                            <td>{item.price}</td>
                            <td><img src={getImageSource(item.Image)} width="300px" /></td>
                            <td><button className="btn btn-danger btn-sm" onClick={() => {
                                var response = window.confirm("Are you sure you want to remove this Item?");
                                if (response) {
                                    axios.delete(`http://localhost:8070/ShoppingCart/delete/${buyerEmail}/${item.itemID}`).then(() => {
                                        alert("Item Deleted");
                                        window.location.replace("http://localhost:3000/buyer/view/cart");
                                    }).catch((err) => {
                                        alert(err);
                                    })
                                }
                            }}>Remove from cart</button></td>
                            {calcNetValue(item.productQty, item.price)}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ float: "right" }}>
                <a type="button" class="btn btn-primary" onClick={proceedToCheckout}>Checkout</a>
            </div>
            <h3>Total Amount = {total}</h3>

        </div>
    )
}