import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Buffer } from 'buffer';
import Button from 'react-bootstrap/Button';

export default function BuyerCart() {
    // If there is no active session, the buyer is redirected to the buyerlogin page.
    if (sessionStorage.getItem("sAyurCenReyub") === null) {
        window.location.replace("/buyerlogin");
    }

    //creating variables
    const [items, setItems] = useState([]);
    let history = useHistory();
    const buyerEmail = sessionStorage.getItem("buyerEmail");
    let total = 0;

    // Retrieves the items added to the cart by the buyer
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

    // Function that calculates the net value of an item
    function calcNetValue(qty, price){
        total = total + (qty * price);
    }

    // Function that redirects the buyer to the checkout page
    function proceedToCheckout(e){
        e.preventDefault();

        // If the cart is empty, an alert is shown and the checkout process is not allowed.
        if (total === 0){
            alert("Please add items before checkout!");
        } else {
            sessionStorage.setItem("netAmount", total);
            window.location.replace("http://localhost:3000/buyer/view/cart/checkout");
        }
    }

    function resetItemQty(itemID, qty){
        axios.get(`http://localhost:8070/item/getitem/${itemID}`).then((res)=>{
            const SupplierID = res.data[0].SupplierId;
            const ProductId = res.data[0].ProductId;
            const Name = res.data[0].Name;
            const Description = res.data[0].Description;
            const Price = res.data[0].Price;
            const Quantity = res.data[0].Quantity + qty;
            const Image = res.data[0].Image;
            axios.put(`http://localhost:8070/item/update/${res.data[0].SupplierId}/${res.data[0].ProductId}`, {
                SupplierID,
                ProductId,
                Name,
                Description,
                Price,
                Quantity,
                Image
            })
        }).catch((err)=>{
            alert(err);
        })
    }

    return (
    <div>
        <a href="/buyerhome" style={{ display: 'inline-block', textAlign: 'left',marginLeft: '10px' }}>
        {/* Button to go back to the buyer home page */}
        <button className="btn btn-dark">Back</button>
        </a>

        <div className="container">
        
      

    
        <table className="table table-borderless">
            <tbody>
                {/* Map through the items in the cart */}
                {items.map((item) => (
                    <tr key={buyerEmail} className="border">
                        <td><img src={getImageSource(item.Image)} width="100" height="100" /></td>
                        <td>{item.itemID}</td>
                        <td>{item.supplierId}</td>
                        <td>{item.productName}</td>
                        <td>{item.productQty}</td>
                        <td>{parseFloat(item.price).toFixed(2)}</td>
                        
                        <td>
                            <button className="btn btn-danger btn-lg" style={{fontSize: "20px", padding: "10px 20px"}}  onClick={() => {
                                var response = window.confirm("Are you sure you want to remove this Item?");
                                if (response) {
                                    axios.delete(`http://localhost:8070/ShoppingCart/delete/${buyerEmail}/${item.itemID}`).then(() => {
                                        resetItemQty(item.itemID, item.productQty);
                                        alert("Item Deleted");
                                        window.location.replace("http://localhost:3000/buyer/view/cart");
                                    }).catch((err) => {
                                        alert(err);
                                    })
                                }
                            }}>
                                <i className="fas fa-trash-alt fa-lg"/>
                            </button>
                        </td>
                        {/* Calculate the net value of the item */}
                        {calcNetValue(item.productQty, item.price)}
                    </tr>
                ))}
            </tbody>
        </table>

        <div style={{ float: "right" }}>
            
            <a type="button" class="btn btn-primary" onClick={proceedToCheckout}>Checkout</a>
        </div>
        <h3>Total Amount = Rs.{parseFloat(total).toFixed(2)}</h3>
        <br/><br/><br/><br/><br/><br/>
        </div>
</div>
    )
}