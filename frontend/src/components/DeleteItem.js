
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
            setProductId(res.data.inventory.ItemCode);
            setName(res.data.inventory.Description);
            setDescription(res.data.inventory.InvoiceNo);
            setPrice(res.data.inventory.Quantity);
            setQuantity(res.data.inventory.Supplier);
            setImage(res.data.inventory.OrderDate);
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
                        <label for="name">Product ID</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="name" value={ProductId} placeholder="Enter Item Code" disabled />
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="name">Name</label>
                    </div>
                    <div class="col-sm-10">
                        {/* using the value --> we can display the values that was previously entered by the user.*/}
                        <input type="text" className="form-control" id="age" value={Name} placeholder="Enter Description" disabled />
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="gender">Description</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="gender" value={Description} placeholder="Enter Invoice No" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="gender">Price</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="number" className="form-control" id="quantity" value={Price} placeholder="Enter quantity" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="gender">Quantity</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="supplier" value={Quantity} placeholder="Enter supplier" disabled />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="gender">Image</label>
                    </div>

                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="date" value={Image} placeholder="Enter Order Date" disabled />

                    </div>
                </div>
                <button type="submit" className="btn btn-danger">Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a  type="button" href = "/item" class="btn btn-secondary">Back</a>
            </form>
        </div>
    )
}
