import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Buffer } from 'buffer';

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
    const [Image, setImage] = useState("");

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
            setQuantity(res.data.item.Quantity);
            setImage(res.data.item.Image);
        }).catch((err) => {
            console.log(err);
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

    if (Image !== "") {
        return (
            <div className="container">
                <div><a type="button" href="/buyerhome" class="btn btn-secondary">Back</a></div>
                <form onSubmit={add}>
                    <table className="table table-borderless">
                        <tr>
                            <th scope="col">Product ID</th>
                            <th scope="col">Supplier ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Image</th>
                        </tr>
                        <tr scope="row">
                            <td class="text-uppercase">{ProductId}</td>
                            <td class="text-uppercase">{SupplierId}</td>
                            <td class="text-uppercase">{Name}</td>
                            <td class="text-uppercase">{Description}</td>
                            <td class="text-uppercase">{Price}</td>
                            {/* <td class="text-uppercase">{Quantity}</td> */}
                            <td><input type={'number'} value={Quantity} onChange={(e) => {
                                setQuantity(e.target.value);
                            }} ></input></td>
                            <td><img src={getImageSource(Image)} alt={Name} width="300px" /></td>
                            <td><button className="btn btn-success" style={{ marginTop: '10px' }} onClick={(e) => {
                                add(e);
                                // window.location.replace(`http://localhost:3000/buyer/view/item/${id}`);
                            }}>Add to cart</button></td>
                        </tr>
                    </table>
                </form>
            </div>
        )
    }

}