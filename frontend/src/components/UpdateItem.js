
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Buffer } from 'buffer';

function UpdateItem() {

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

    const { update, id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8070/item/get/${SupplierId}/${id}`).then((res) => {
            console.log(res.data.item);
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

    function handleProductImageChange (event) {
        const imageFile = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
            setImage(reader.result);
            console.log(reader.result); //converts to base64.
        };
        reader.onerror = error => {
            console.log("Error : ",error);
        };
        
      };

    function updateData(e) {
        e.preventDefault();

        const newItem = { SupplierId, ProductId, Name, Description, Price, Quantity, Image }
        axios.put(`http://localhost:8070/item/update/${SupplierId}/${id}`, newItem).then(() => {
            alert("Item  Updated");
            //window.location --> helps the user to navigate(frontend --> so port is 3000)
            //axios --> navigation between frontend and backend --> so port is 8070.
            window.location.replace("http://localhost:3000/item/");

        }).catch((err) => {
            alert(err);
        })
    }

    const getImageSource = (imageData) => {
        let imageSource = `data:image/png;base64,${Buffer.from(imageData.data).toString('base64').substring(19)}`;
        imageSource = imageSource.slice(0, imageSource.length - 2);
        return imageSource;
    };

    
if (Image !== ""){
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
                    }} disabled/>
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="name">Name</label>
                    </div>


                    {/* using the value --> we can display the values that was previously entered by the user.*/}
                    <div class="col-sm-10">
                    <input type="text" className="form-control" id="name" value={Name} placeholder="Enter Name" onChange={(e) => {
                        console.log("Hi");
                        setName(e.target.value);
                        //console.log(e.target.v)
                    }} />
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="description">Description</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="text" className="form-control" id="description" value={Description} placeholder="Enter Description" onChange={(e) => {
                        setDescription(e.target.value);
                    }} />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="price">Price</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="number" className="form-control" id="quantity" value={Price} placeholder="Enter quantity" onChange={(e) => {
                        setPrice(e.target.value);

                    }} />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="quantity">Quantity</label>
                    </div>

                    <div class="col-sm-10">
                    <input type="number" className="form-control" id="quantity" value={Quantity} placeholder="Enter supplier" onChange={(e) => {
                        setQuantity(e.target.value);
                    }} />
                    </div>
                </div>

                <div className="form-group">
                    
                    <div class="col-sm-10">
                    {/*<input type="file" className="form-control" id="image" src={getImageSource(Image)} placeholder="Upload Image" onChange={(e) => {
                       handleProductImageChange(e);*/}
                       <p src={getImageSource(Image)}  onChange={(e) => {
                        handleProductImageChange(e);
                       // setImage(e.target.value);
                        /*const file = e.target.files[0];
                         const reader = new FileReader();

                            reader.onload = (event) => { 
                            setImage(event);
                            };

                             reader.readAsDataURL(file);*/
                    }}/>
                    </div>
                    
                </div>
                <button type="submit" className="btn btn-success">Update</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a  type="button" href = "/sellerhome/item" class="btn btn-secondary">Back</a>
            </form>
        </div>
    )
}
}

export default UpdateItem;
