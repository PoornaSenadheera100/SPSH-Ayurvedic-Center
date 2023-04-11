// rafce --> this command will automatically generate the basic code.

//import the React library here, which was assigned to a variable callled "react" in package.json
//The useState function in 'ReactHook' will be called in the import statement. ---> this helps to define a "state" in a function based approach, without the use of a constructor.
//If we don't use the "Export default" --> have to include the curly brackets surrounding "useState"
//First thing it returns --->This "useState" returns the value of the state.(The counter we developed using the "increment" button for instance)
//Second thing it returns ---> The "useState" also has the respective function to be implemented that reveals how the state value is updated.
import React, { useEffect, useState } from "react";
import FileBase64 from 'react-file-base64';
//import ReactDOM from 'react-dom';
//Import axios from the axios package we installed.This is needed to move the data from the frontend to the backend via an http request
import axios from "axios";
//const fs = require('fs');


export default function AddItem() {

    if(sessionStorage.getItem("sAyurCenRelles") === null){
        window.location.replace("/sellerlogin");
    }

    //Create 3 variables/states for name,age and gender
    //The initialization of these 3 states have been done below.
    //It is using the setName/setAge/setGender that we assign values to the states of name/age/gender respectively.
    //As the initial/default value we pass ("") in the useState of each respective state.
    //onChange is an event
    //The values passed in the text field of the form should be assigned to the respective state(name,age,gender) --> we do this using the onChange event available.
    //Value given in the input field to record he name should be passed to the state "name" respectively. ---> could be done using the setName method.
    //In the setName method we pass an argument ---> (e.target.value) --> what happens in taget.value is ---> value entered in the text field to input the name will be assigned to the state of "name".
    //Same process applies to the other 2 variables as well.
    const [ProductId,setItemCode] = useState("");
    const [Name, setItemName] = useState("");
    const [Description,setItemDescription] = useState("");
    const [Price,setItemPrice] = useState();
    const [Quantity, setItemQty] = useState();
    const [Image, setImage] = useState("");
    const [productIds, setProductIds] = useState([]);


    const SupplierId = sessionStorage.getItem("sellerEmail");

    const [block, setBlock] = useState(false);


    useEffect(() => {
        axios.get("http://localhost:8070/item/").then((res) => {
            console.log(res.data);
            setProductIds(res.data.ProductId);
           // setInventories(res.data);
            // console.log(inventories[1].ItemCode);
        }).catch((err) => {
            alert(err.message);
        })
    }, [])

  

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



    function sendData(e) {
        //The below code prevents the normal behaviour of the submit button.
        e.preventDefault();



        //Create a javascript object. That passes the 3 attributes.
        const newItem = {
            SupplierId,
            ProductId,
            Name,
            Description, 
            Price,
            Quantity, 
            Image
        }




        //We pass the data from the frontend to the backend using the post http request.
        //Then the backend server responds with another http request.
        //This http response coming from the backend is handled using a seperate npm package called "axios" --> this is imported at the top following the installation.
        //axios has a method called post that passes 3 arguments usually, if there is authentication(No authentication meaning --> only 2 parameters)
        //Pass the backend URL as the first parameter.
        //Pass the JS object next as the second parameter, that holds the 3 attributes passed through the form.


        //METHOD TO PREVENT DUPLICATE RECORDS ENTERED.
        /*
            const len = productIds.length;
            let i;
            let count;
            for(i = 0; i < len; i++){
                if(productIds[i] == newItem.ProductId){
                    alert("Existing Product ID cannot be entered");
                    count++;
                }
            }

          if(count == 0 ){ 
        */
        if (block === false){
            axios.post(`http://localhost:8070/item/add/`, newItem).then(() => {
                //After sending the data --> backend server responds --> if successfully added then an alert message is sent.
                alert(`Item Added`);
                window.location.replace("http://localhost:3000/sellerhome/item");


                //After submitting the details ---> the values should be taken off from the fields ---> to do this --> the setters are assigned with ("")
                setItemCode("");
                setItemName("");
                setItemDescription("");
                setItemPrice();
                setItemQty();
                setImage("");

                //Can move to the home page after deleting the data
                // window.location.replace("http://localhost:3000/item");

                //can move to the add student page after deleting the data.  
                //window.location.replace("http://localhost:3000/inventory/add");
            }).catch((err) => {
                //After sending the data --> backend server responds --> if it wasn't successfully added --> the error is handled as an exception.
                alert(err);
            })
            //Pass the js object that we created in the console.(This will display the name, age,gender that's passed).
            //console.log(newStudent);
        } else {
            alert("This Product ID is already existing!")
        }
    }

    function checkItemCode(itemCode){
        axios.get(`http://localhost:8070/item/getitem/${itemCode}`).then((res)=>{
            if (res.data.length !== 0){
                console.log(itemCode);
                setBlock(true);
            } else {
                setBlock(false);
            }
        })
        console.log(block)
    }

// --> closing bracket of "Duplicate Record methods"}

    return (
        <div className="container">
             <h1>Add Item</h1>
            <form onSubmit={sendData}>
            
                <div className="form-group"  >
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="name">Item Code</label>
                    </div>

                    <div class="col-sm-10">
                        <input type="text" className="form-control" required id="code" placeholder="Enter item code" onChange={(e) => {
                            setItemCode(e.target.value);
                            checkItemCode(e.target.value);
                        }} />
                        <div required/>
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="description">Item Name</label>
                    </div>

                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="description" required placeholder="Enter Name" onChange={(e) => {
                            setItemName(e.target.value);
                        }} />
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="description">Item Description</label>
                    </div>

                    <div class="col-sm-10">
                        <input type="text" className="form-control" required id="description" placeholder="Enter Description" onChange={(e) => {
                            setItemDescription(e.target.value);
                        }} />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="quantity">Item Price</label>
                    </div>

                    <div class="col-sm-10">
                        <input type="number" className="form-control" required id="price" placeholder="Enter Price " onChange={(e) => {
                            setItemPrice(e.target.value);
                            
                        }} />
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ marginLeft: "0px", marginRight: "auto", width: "10%" }}>
                        <label for="quantity">Quantity</label>
                    </div>

                    <div class="col-sm-10">
                        <input type="number" className="form-control" required id="quantity" placeholder="Enter Quantity " onChange={(e) => {
                            setItemQty(e.target.value);
                        }}/>
                    </div>
                </div>

                <div class="col-sm-10">
                    <label htmlFor="item_image">Image</label>
                        <input type="file" id="image" placeholder="Upload Image" required onChange={(e)=>{
                        handleProductImageChange(e);
            }}/>
            
            
            </div>
            <br></br>
                <button type="submit" class="btn btn-success">Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a  type="button" href = "/sellerhome/item" class="btn btn-secondary">Back</a>
            </form>
        </div>
    )
}

