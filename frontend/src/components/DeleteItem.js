
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DeleteItem() {
    const [ProductId, setProductId] = useState("");
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState();
    const [Quantity, setQuantity] = useState();
    const [Image, setImage] = useState("");

    const { del, id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/item/get/${id}`).then((res) => {
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

    function deleteData(e) {
        e.preventDefault();
        axios.delete(`http://localhost:8070/item/delete/${id}`).then(() => {
            alert("Item deleted");

            window.location.replace("http://localhost:3000/item");
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <div>
            <h1>Delete Inventory</h1>
            <form onSubmit={deleteData}>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="product_id">Product ID</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="product_id" value={ProductId} placeholder="Enter Item Code" disabled />
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="name">Name</label>
                    </div>
                    <div class="col-sm-10">
                        {/* using the value --> we can display the values that was previously entered by the user.*/}
                        <input type="text" className="form-control" id="age" value={Name} placeholder="Enter Name" disabled />
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="description">Description</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="description" value={Description} placeholder="Enter Description" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="price">Price</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="number" className="form-control" id="price" value={Price} placeholder="Enter Price" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="quantity">Quantity</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="number" className="form-control" id="quantity" value={Quantity} placeholder="Enter Quantity" disabled />
                    </div>
                </div>

                <div className="form-group">     
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="image">Image</label>
                    </div>

                    <div class="col-sm-10">
                        <input type="file" className="form-control" id="image" value={Image} placeholder="Upload Image" disabled />

                    </div>
                </div>
                <button type="submit" className="btn btn-danger">Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a  type="button" href = "/item" class="btn btn-secondary">Back</a>  
            </form>
        </div>
    )
}
