import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Buffer } from 'buffer';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

export default function BuyerViewItem() {

    //session validation
    if (sessionStorage.getItem("sAyurCenReyub") === null) {
        window.location.replace("/buyerlogin");
    }

    const [ProductId, setProductId] = useState("");
    const [SupplierId, setSupplierId] = useState("");
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    // const [buyerEmail, setBuyerEmail] = useState("");   //IMPLEMENT
    const [Price, setPrice] = useState();
    const [Quantity, setQuantity] = useState();
    const [MaxQuantity, setMaxQuantity] = useState();
    const [Image, setImage] = useState("");

    const [rate, setRate] = useState(0);

    const { id } = useParams();
    const buyerEmail = sessionStorage.getItem("buyerEmail"); //implement this to get the buyer email from sessions

    useEffect(() => {
        axios.get(`http://localhost:8070/buyer/get/item/${id}`).then((res) => {
            console.log(res.data);
            console.log(buyerEmail);
            setProductId(res.data.item.ProductId);
            setSupplierId(res.data.item.SupplierId);
            setName(res.data.item.Name);
            setDescription(res.data.item.Description);
            setPrice(res.data.item.Price);
            setMaxQuantity(res.data.item.Quantity);
            setQuantity(1);
            setImage(res.data.item.Image);
        }).catch((err) => {
            console.log(err);
        })

        axios.get(`http://localhost:8071/rate/get/${buyerEmail}/${id}`).then((res)=>{
            console.log(res.data);
            setRate(res.data[0].rate);
        })

    }, []);

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

        axios.post(`http://localhost:8070/ShoppingCart/add`, newCart).then(() => {
            alert("Item added to cart");
            window.location.replace("http://localhost:3000/buyerhome");
        }).catch((err) => {
            alert(err);
        })
    }

    //Get the image source.
    const getImageSource = (imageData) => {


        let imageSource = `data:image/png;base64,${Buffer.from(imageData.data).toString('base64').substring(19)}`;
        imageSource = imageSource.slice(0, imageSource.length - 2);
        return imageSource;
    };

    function rateProduct(value){
        const newRate = {
            id,
            buyerEmail,
            value
        };
        if (rate === 0){
            axios.post("http://localhost:8071/rate/add", newRate).catch((err)=>{
                alert("Rating Service is not available.");
            });
        } else {
            axios.put("http://localhost:8071/rate/update", newRate).catch((err)=>{
                alert("Rating Service is not available.");
            })
        }
    }

    if (Image !== "") {
        return (
            <div className="container">
                 <div style={{padding: '10px'}}><a type="button" href="/buyerhome" className="btn btn-secondary">Back</a></div>
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
                                        <input for = "qunatitytxt" type="number" min="1" defaultValue="1" max={MaxQuantity}  onChange={(e) => { setQuantity(e.target.value);}} style={{marginLeft: '5px'}} /><br />
                                        Price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:  Rs.{parseFloat(Price).toFixed(2)}<br />
                                      
                                        Supplier : {SupplierId} <br/>
                                        <b>Rate the Product</b> &nbsp;
                                        <Rater onRate={(value)=>{
                                            rateProduct(value.rating);
                                        }} total={5} rating={rate} style={{ fontSize: '30px' }}/>
                                    </div>
                                </div>
                                <button className="btn btn-success" style={{marginTop: '10px', width: '100%'}} onClick={(e) => { add(e); }}>Add to cart</button>
                            </form>
                        </div>
                    </div>
            </div>
        )
    }

}