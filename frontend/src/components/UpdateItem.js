
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateItem() {

    if(sessionStorage.getItem("sAyurCenRelles") === null){
        window.location.replace("/sellerlogin");
    }

    const sellerEmail = sessionStorage.getItem("sellerEmail");

    const [ProductId, setProductId] = useState("");
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState();
    const [Quantity, setQuantity] = useState();
    const [Image, setImage] = useState("");

    const { update, id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8070/item/get/${id}`).then((res) => {
            console.log(res.data.item);
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

    function updateData(e) {
        e.preventDefault();

        const newItem = { ProductId, Name, Description, Price, Quantity, Image }
        axios.put(`http://localhost:8070/item/update/${id}`, newItem).then(() => {
            alert("Item  Updated");
            //window.location --> helps the user to navigate(frontend --> so port is 3000)
            //axios --> navigation between frontend and backend --> so port is 8070.
            window.location.replace("http://localhost:3000/item/");

        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <div>
            <h1>Update Item</h1>
            <form onSubmit={updateData}>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="name">Product ID</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="text" className="form-control" id="code" value={ProductId} placeholder="Enter Product ID" onChange={(e) => {
                        setProductId(e.target.value);
                    }} />
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="name">Name</label>
                    </div>


                    {/* using the value --> we can display the values that was previously entered by the user.*/}
                    <div class="col-sm-10">
                    <input type="text" className="form-control" id="description" value={Name} placeholder="Enter Name" onChange={(e) => {
                        setName(e.target.value);
                    }} />
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="gender">Description</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="text" className="form-control" id="invoiceNo" value={Description} placeholder="Enter Description" onChange={(e) => {
                        setDescription(e.target.value);
                    }} />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="gender">Price</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="number" className="form-control" id="quantity" value={Price} placeholder="Enter quantity" onChange={(e) => {
                        setPrice(e.target.value);

                    }} />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="gender">Quantity</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="text" className="form-control" id="supplier" value={Quantity} placeholder="Enter supplier" onChange={(e) => {
                        setQuantity(e.target.value);
                    }} />
                    </div>
                </div>


                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="gender">Image</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="file" className="form-control" id="date" value={Image} placeholder="Enter Order Date" onChange={(e) => {
                       // setImage(e.target.value);
                        const file = e.target.files[0];
                         const reader = new FileReader();

                            reader.onload = (event) => {
                            setImage(event);
                            };

                             reader.readAsDataURL(file);
                    }} />
                    </div>
                    
                </div>
                <button type="submit" className="btn btn-success">Update</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a  type="button" href = "/item" class="btn btn-secondary">Back</a>
            </form>
        </div>
    )
}

export default UpdateItem;
