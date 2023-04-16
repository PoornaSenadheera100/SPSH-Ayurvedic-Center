import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Buffer } from 'buffer';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Button from 'react-bootstrap/Button';

export default function BuyerViewItem() {

    //session validation
    if (sessionStorage.getItem("sAyurCenReyub") === null) {
        window.location.replace("/buyerlogin");
    }

    // States
    const [ProductId, setProductId] = useState("");
    const [SupplierId, setSupplierId] = useState("");
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState();
    const [Quantity, setQuantity] = useState();
    const [MaxQuantity, setMaxQuantity] = useState(); // Maximum quantity of the product available in stock
    const [Image, setImage] = useState(""); // Base64 encoded string of the product image
    const [rate, setRate] = useState(0); // Initial user rating for the product is set to 0

    // Getting the product ID from the URL using useParams hook
    const { id } = useParams();
    // Get the buyer's email from session storage
    const buyerEmail = sessionStorage.getItem("buyerEmail"); //implement this to get the buyer email from sessions

    const [newRemainingQty, setNewRemainingQty] = useState();

    useEffect(() => {
        // Fetching the product data from the database
        axios.get(`http://localhost:8070/buyer/get/item/${id}`).then((res) => {
            console.log(res.data);
            console.log(buyerEmail);
            setProductId(res.data.item.ProductId);
            setSupplierId(res.data.item.SupplierId);
            setName(res.data.item.Name);
            setDescription(res.data.item.Description);
            setPrice(res.data.item.Price);
            setMaxQuantity(res.data.item.Quantity);
            setNewRemainingQty(res.data.item.Quantity - 1);
            setQuantity(1);
            setImage(res.data.item.Image);
        }).catch((err) => {
            console.log(err);
        })

        // Fetching the user rating for the product
        axios.get(`http://localhost:8071/rate/get/${buyerEmail}/${id}`).then((res)=>{
            console.log(res.data);
            setRate(res.data[0].rate);// If user has already rated the product, set the rating to the user's previous rating
        })

    }, []);

    // Function to add the product to the cart
    function add(e) {
        e.preventDefault();

        const newCart = {
            buyerEmail,
            ProductId,
            SupplierId,
            Name,
            Quantity,
            Price,
            Image
        }

        if (MaxQuantity === 0){
            alert("Sorry! This Item is currently not available.");
            
        } else if(Quantity > MaxQuantity){
            alert("Insufficient Quantity!");
        } else {
            axios.post(`http://localhost:8070/ShoppingCart/add`, newCart).then(() => {
                updateItem(newRemainingQty);
                alert("Item added to cart");
                window.location.replace("http://localhost:3000/buyerhome");
            }).catch((err) => {
                alert(err);
            })
        }
        
    }

    //Get the image source.
    const getImageSource = (imageData) => {


        let imageSource = `data:image/png;base64,${Buffer.from(imageData.data).toString('base64').substring(19)}`;
        imageSource = imageSource.slice(0, imageSource.length - 2);
        return imageSource;
    };

    // Function to allow users to rate the product
    function rateProduct(value){
        const newRate = {
            id,
            buyerEmail,
            value
        };
        // Check if the product has been rated before or not
        if (rate === 0){
            // If not, add the rating to the server
            axios.post("http://localhost:8071/rate/add", newRate).catch((err)=>{
                alert("Rating Service is not available.");
            });
        } else {
             // If already rated, update the rating on the server
            axios.put("http://localhost:8071/rate/update", newRate).catch((err)=>{
                alert("Rating Service is not available.");
            })
        }
    }

    function calcRemainingQty(buyingQty){
        setNewRemainingQty(MaxQuantity - buyingQty);
    }

    function updateItem(Quantity){
        const newItem = {
            SupplierId,
            ProductId,
            Name,
            Description,
            Price,
            Quantity,
            Image
        };

        axios.put(`http://localhost:8070/item/update/${SupplierId}/${id}`, newItem);
    }

    // Check if the product has an image
    if (Image !== "") {
        // Return the product details with the image
        return (
            <div className="container">
                 <div style={{padding: '10px'}}><a type="button" href="/buyerhome"><Button variant="dark">Back</Button></a></div>
                    <div align="center" style={{border: '1px solid black', borderRadius: '5px', padding: '10px', maxWidth: '500px', margin: '0 auto'}}>
                        <div align="center">
                            <form onSubmit={add}>
                                <div style={{border: '1px solid #ccc', borderRadius: '5px', padding: '10px'}}>
                                    <div style={{textAlign: 'center', marginBottom: '10px'}}>
                                        <h1>{Name}</h1>
                                    </div>
                                 <div style={{textAlign: 'center'}}>
                                     <img src={getImageSource(Image)} alt={Name} style={{maxWidth: '100%', height: 'auto'}} />
                                </div>
                                    <div style={{marginTop: '10px', textAlign:"left"}}>
                                        {Description}<br />
                                        PID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {ProductId}<br />
                                        Quantity :
                                        <input for = "qunatitytxt" type="number" min="1" defaultValue="1" max={MaxQuantity}  onChange={(e) => { 
                                            setQuantity(e.target.value);
                                            calcRemainingQty(e.target.value);
                                            }} style={{marginLeft: '5px'}} /><br />
                                        Price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:  Rs.{parseFloat(Price).toFixed(2)}<br />
                                      
                                        Supplier : {SupplierId} <br/>
                                        {/* Create a Rater component to allow users to rate the product */}
                                        <b>Rate the Product</b> &nbsp;
                                        <Rater onRate={(value)=>{
                                            rateProduct(value.rating);
                                        }} total={5} rating={rate} style={{ fontSize: '30px' }}/>
                                    </div>
                                </div>
                                {/* Create a button to add the product to the cart */}
                                <button type="submit" className="btn btn-success" style={{marginTop: '10px', width: '100%'}} onClick={add}>Add to cart</button>
                            </form>
                        </div>
                    </div>
            </div>
        )
    }

}