
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

    //Creating an array that passes 2 values.
    //First value of "students" returns the state.
    //Second value of "setStudents" returns the method that sets the values to the statae, or the one that changes the value of the state.
    //The initial/default value of the useState is an empty array.([])
    const [items, setItem] = useState([]);

    //assigning the method of useHistory to the variable "history"
    let history = useHistory();

    
    useEffect(() => {

        

        //There's another function called getStudents defined inside the arrow function.
        function getItem() {
            //axois can go to the mentioned URL and get the backend data.
            //axois uses the "get" method --> when retrieving data from the DB --> since that is the http request that is specified in the BACKEND
            //If data was successfully fetched, then ---> the data objects sent as an array is passed to the seStudent method.
            axios.get("http://localhost:8070/item/").then((res) => {
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
                            window.location.replace(`http://localhost:3000/item/add/`);
                        }}>Add Item</button>
                        <button type="button" class="btn btn-outline-dark" onClick={() => {

                            //history.push moves from the current page.
                            //history.push(`/update/${student._id}`);
                            //window.location also redirects to another page.(delete page with the ID)
                            window.location.replace(`http://localhost:3000/inventory/search`);
                        }}>Search Item</button>
                        
                       
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
                        items.map((item) => (
                            <tr scope="row" key={item._id}>
                                <td class="text-uppercase">{item.ProductId}</td>
                                <td class="text-uppercase">{item.Name}</td>
                                <td class="text-uppercase">{item.Description}</td>
                                <td class="text-uppercase">{item.Price}</td>
                                <td class="text-uppercase">{item.Quantity}</td>
                                <td><img src={getImageSource(item.Image)} alt={item.Name} width="300px"/></td>
                                <td>
                                    <button className="btn btn-success" onClick={() => {

                                        //history.push moves from the current page.
                                        //history.push(`/update/${student._id}`);
                                        //window.location also redirects to another page.(delete page with the ID)
                                        window.location.replace(`http://localhost:3000/item/update/${item._id}`);
                                    }}>UPDATE</button>
                                </td>

                                <td>
                                    <button className="btn btn-danger" onClick={() => {
                                        //history.push(`/delete/${student._id}`);
                                        //window.location also redirects to another page.(delete page with the ID)
                                        window.location.replace(`http://localhost:3000/item/delete/${item._id}`);
                                    }}>DELETE</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}
