
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Buffer } from 'buffer';

export default function SingleItem() {

    if(sessionStorage.getItem("sAyurCenRelles") === null){
        window.location.replace("/sellerlogin");
    }

    const SupplierId = sessionStorage.getItem("sellerEmail");

    const [ProductId, setProductId] = useState("");
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState();
    const [Quantity, setQuantity] = useState();
    const [Image, setImage] = useState("");

    const { id } = useParams();
    //const { productId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/item/get/${SupplierId}/${id}`).then((res) => {
            console.log(res.data);
            console.log(SupplierId);
            //console.log(productId);
            setProductId(res.data.item[0].ProductId);
            setName(res.data.item[0].Name);
            setDescription(res.data.item[0].Description);
            setPrice(res.data.item[0].Price);
            setQuantity(res.data.item[0].Quantity);
            setImage(res.data.item[0].Image);
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
                <div><a type="button" href="/sellerhome/item" class="btn btn-secondary">Back</a></div>
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
                    </tr>
                </table>
            </div>
        )
    }

}

