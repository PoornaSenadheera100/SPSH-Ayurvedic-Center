import React, { useState } from 'react';
import axios from "axios";

export default function AddItem() {
  const [itemCode,setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemQty,setItemQty] = useState('');
  const [itemDesc,setItemDesc] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImage, setItemImage] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission and save the data to your database or perform any other actions you want.
    console.log('Item Code:', itemCode);
    console.log('Item Name:', itemName);
    console.log('Item Quantity :',itemQty);
    console.log('Item Description:',itemDesc);
    console.log('Item Price:',itemPrice);
    console.log('Item Image:', itemImage);
  };

  /*
  app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            //Create a new instance and save the details.
            const newItem = new Item({
                name: req.body.name,
                image:{
                    //shows the filename being added.
                    data:req.file.filename,
                    //type or format of image. Could be jpg,jpeg or png. Doesn't mattrer.
                    contentType:'image/png'
                }
            })
            newItem.save().then(()=>res,send('Successfully uploaded'))
            .catch(err=>console.log)
        }
    })
})
*/

  const ItemNameChange = (event) => {
    
    setItemName(event.target.value);
  };

  const handleProductImageChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        setItemImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div>
    <h1>Add Item</h1>

    <form onSubmit={AddItem}>
        <label htmlFor="item_id">Item ID</label>
        <input type="text" id="item_id" placeholder="Enter Item ID" required onChange={(e)=>{
            setItemCode(e.target.value);
        }}/>

        <label htmlFor="item_name">Item Name</label>
        <input type="texr" id="name" placeholder="Enter Item Name" required onChange={(e)=>{
            setItemName(e.target.value);
        }}/>

        <label htmlFor="phone">Phone</label>
        <input type="phone" id="phone" placeholder="Phone No" required onChange={(e)=>{
            setPhone(e.target.value);
        }}/>

        <br></br>

        <label htmlFor="newpassword">New Password</label>
        <input type="password" id="newpassword" placeholder="Password" required onChange={(e)=>{
            setPassword(e.target.value);
        }}/>

        <br></br>

        <label htmlFor="repassword">Re-enter Password</label>
        <input type="password" id="repassword" placeholder="Password" required onChange={(e)=>{
            setRePassword(e.target.value);
        }}/>

        <br></br>

        <button type="submit">Submit</button>
    </form>
</div>
  );
}

/*
export default AddItem;

//code (Past)
import axios from "axios";
import { useState } from "react";

export default function AddSeller(){

    const [name, setName] = useState({});
    const [email, setEmail] = useState({});
    const [phone, setPhone] = useState({});
    const [password, setPassword] = useState({});
    const [rePassword, setRePassword] = useState({});

    function proceed(e){
        e.preventDefault();

        if (password !== rePassword){
            alert("Re-entered password does not match with the password that you have entered!");
        }
        else{
            // checkAccount();
            axios.get(`http://localhost:8070/seller/get/email/${email}`).then((res)=>{
                if (res.data[0] === undefined){
                    const newSeller = {
                        name,
                        email,
                        phone,
                        password
                    }

                    axios.post("http://localhost:8070/seller/add", newSeller).then(()=>{
                        alert("Registration Successfull !");
                        window.location.replace("http://localhost:3000/adminhome/managesellers");
                    }).catch((err)=>{
                        alert("Something went wrong !");
                    })
                }
                else{
                    alert("The seller already has an account !");
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    return(
        <div>
            <h1>Create a Seller Account</h1>

            <form onSubmit={proceed}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name" required onChange={(e)=>{
                    setName(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="abc@gmail.com" required onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="phone">Phone</label>
                <input type="phone" id="phone" placeholder="Phone No" required onChange={(e)=>{
                    setPhone(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="newpassword">New Password</label>
                <input type="password" id="newpassword" placeholder="Password" required onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="repassword">Re-enter Password</label>
                <input type="password" id="repassword" placeholder="Password" required onChange={(e)=>{
                    setRePassword(e.target.value);
                }}/>

                <br></br>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
*/
