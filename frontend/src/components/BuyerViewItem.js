import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Buffer } from 'buffer';

export default function BuyerViewItem() {

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

    //Get the image source.
    const getImageSource = (imageData) => {


        let imageSource = `data:image/png;base64,${Buffer.from(imageData.data).toString('base64').substring(19)}`;
        imageSource = imageSource.slice(0, imageSource.length - 2);
        return imageSource;
    };

    if (Image !== "") {
        return (
            <div className="container">
                <div><a type="button" href="/buyerhome" class="btn btn-secondary">Back</a></div>
                <table className="table table-borderless">
                    <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Image</th>
                    </tr>
                    <tr scope="row">
                        <td class="text-uppercase">{ProductId}</td>
                        <td class="text-uppercase">{Name}</td>
                        <td class="text-uppercase">{Description}</td>
                        <td class="text-uppercase">{Price}</td>
                        <td class="text-uppercase">{Quantity}</td>
                        <td><img src={getImageSource(Image)} alt={Name} width="300px" /></td>
                        <td><button className="btn btn-success" onClick={() => {
                            // window.location.replace(`http://localhost:3000/buyer/view/item/${item.ProductId}`);
                        }}>Add to cart</button></td>
                    </tr>
                </table>
            </div>
        )
    }

}