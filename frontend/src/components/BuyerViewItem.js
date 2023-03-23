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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: '1rem' }}>
                    <table>
                    {/* <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Image</th>
                    </tr> */}
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', padding: '1rem', border: '1px solid #ccc' }} key={ProductId}>
                        <img src={getImageSource(Image)}  />
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{Name}</h3>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{Description}</h2>
                        <h1 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{Price}</h1>
                        <h1 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{Quantity}</h1>
                        {/* <td><img src={getImageSource(Image)} alt={Name} width="300px" /></td> */}
                        
                        <td><button className="btn-btn-success" onClick={() => {
                            // window.location.replace(`http://localhost:3000/buyer/view/item/${item.ProductId}`);
                        }}>Add to cart</button></td>
                    </div>
                </table>
                </div>
                
                
            </div>
        )
    }

}