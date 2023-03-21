import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function BuyerViewItem(){

    // if(sessionStorage.getItem("sAyurCenNimda") === null){
    //     window.location.replace("/adminlogin");
    // }
    
    const [ProductId, setProductId] = useState("");
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState();
    const [Quantity, setQuantity] = useState();
    const [Image, setImage] = useState("");

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/buyer/get/item/${id}`).then((res) => {
            console.log(res.data);
            setProductId(res.data.item.ProductId);
            setName(res.data.item.Name);
            setDescription(res.data.item.Description);
            setPrice(res.data.item.Price);
            setQuantity(res.data.item.Quantity);
            setImage(res.data.item.Image);
        }).catch((err) => {
            console.log(err);
        })

    }, []);

    return(
        <div>
            {/* <a href="/buyerhome"><button>Back</button></a>
            <h1>View Seller</h1>

            Name &nbsp;&nbsp;&nbsp; : {name}
            <br></br>
            email &nbsp;&nbsp;&nbsp;&nbsp; : {email}
            <br></br>
            phone &nbsp;&nbsp;&nbsp; : {phone}
            <br></br> */}
        </div>
    )
}