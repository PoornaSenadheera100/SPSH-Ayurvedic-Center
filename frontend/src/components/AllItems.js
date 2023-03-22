
//There's another inbuilt method called useEffect in React Hook which will be used when fetching details --> thus, it should also be imported.
//Be it function based or class based, "React" must be imported.
//import the React library here, which was assigned to a variable callled "react" in package.json
import React, { useState, useEffect } from 'react';

import { Buffer } from 'buffer';

//Import the axios pacakge to read the data from the backend to the frontend.
import axios from "axios";

//Used for navigation purposes(after clicking on update button --> moves to update page)
import { useHistory } from "react-router-dom";

//export the function of "AllStudents"
export default function AllItems() {

    if(sessionStorage.getItem("sAyurCenRelles") === null){
        window.location.replace("/sellerlogin");
    }

    //Creating an array that passes 2 values.
    //First value of "students" returns the state.
    //Second value of "setStudents" returns the method that sets the values to the statae, or the one that changes the value of the state.
    //The initial/default value of the useState is an empty array.([])
    const [items, setItem] = useState([]);
    const [ProductId, setProductId] = useState("");

    //assigning the method of useHistory to the variable "history"
    let history = useHistory();


    const SupplierId = sessionStorage.getItem("sellerEmail");

    
    useEffect(() => {

        

        //There's another function called getStudents defined inside the arrow function.
        function getItem() {
            //axois can go to the mentioned URL and get the backend data.
            //axois uses the "get" method --> when retrieving data from the DB --> since that is the http request that is specified in the BACKEND
            //If data was successfully fetched, then ---> the data objects sent as an array is passed to the seStudent method.
            axios.get(`http://localhost:8070/item/${SupplierId}`).then((res) => {
                console.log(res.data);
                setItem(res.data);

                //if it wasn't successfully fetched, then the error is displayed and handled as an exception.
            }).catch((err) => {
                alert(err.message);
            })
        }

        //Invoke the function once its implemented.
        getItem();
    }, [])

    //Get the image source.
    const getImageSource = (imageData) => {

        //Converting the String to an image happens here.
        let imageSource = `data:image/png;base64,${Buffer.from(imageData.data).toString('base64').substring(19)}`;
        //Hilarina (0,3) --> Hil
        //We reduce 2 here --> because, the last 2 values in the basecode is generally of 2 equal characters.(==)
        imageSource = imageSource.slice(0,imageSource.length-2);
        return imageSource;
      };

    return (


        <div className="container">
            <a href="/sellerhome"><button>Back</button></a>
            <h1>All Items</h1>

            <table className="table table-borderless">
                <div className="row">
                    <div class="btn-group" role="group" aria-label="Basic example">

                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-dark" onClick={() => {

                            //history.push moves from the current page.
                            //history.push(`/update/${student._id}`);
                            //window.location also redirects to another page.(delete page with the ID)
                            window.location.replace(`http://localhost:3000/sellerhome/item/add`);
                        }}>Add Item</button>
                        
                       
                       
                    </div>
                </div>
                
                <tr>
                    <th scope="col">Product ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Image</th>
                </tr>
                
                <tbody>
                    {
                        //.map function --> similar to a for each loop.
                        //inventories has all the objects passed as an array.
                        //we pass a varaiable inside the map function ---> to access the attributes.(age,gender,name)
                        //<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '5rem' }}>
                        items.map((item) => (
                            <tr scope="row" key={item._id}>
                                <td class="text-uppercase">{item.ProductId}</td>
                                <td class="text-uppercase">{item.Name}</td>
                                <td class="text-uppercase">{item.Description}</td>
                                <td class="text-uppercase">{item.Price}</td>
                                <td class="text-uppercase">{item.Quantity}</td>
                                <td><img src={getImageSource(item.Image)} alt={item.Name} width="300px"/></td>
                                <td>
                                <button type="button" class="btn btn-outline-dark" onClick={() => {
                                    //history.push moves from the current page.
                                    //history.push(`/update/${student._id}`);
                                    //window.location also redirects to another page.(delete page with the ID)
                                    window.location.replace(`http://localhost:3000/sellerhome/item/getItem/${item.SupplierId}/${item.ProductId}`);
                                    }}>View Item</button>
                                    
                                    <button className="btn btn-success" onClick={() => {

                                        //history.push moves from the current page.
                                        //history.push(`/update/${student._id}`);
                                        //window.location also redirects to another page.(delete page with the ID)
                                        window.location.replace(`http://localhost:3000/sellerhome/item/update/${item.SupplierId}/${item.ProductId}`);
                                    }}>UPDATE</button>
                                </td>

                                <td>
                                <button className="btn btn-danger btn-sm" onClick={()=>{
                                            var response = window.confirm("Are you sure you want to delete this Item?");
                                            if (response){
                                                axios.delete(`http://localhost:8070/item/delete/${item.SupplierId}/${item.ProductId}`).then(()=>{
                                                    alert("Item Deleted");
                                                    window.location.replace("http://localhost:3000/sellerhome/item/");
                                                }).catch((err)=>{
                                                    alert(err);
                                                })
                                            }
                                        }}>Delete <i class="fa fa-trash-o fa-lg"></i></button>
                                </td>
                            </tr>
                        ))
                        //</div>
                    }
                    
                </tbody>
            </table>
        </div>

    )
}
