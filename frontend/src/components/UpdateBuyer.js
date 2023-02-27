import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function UpdateBuyer(){
    
    const [name, setName] = useState({});
    const [address, setAddress] = useState({});
    const [nic, setNic] = useState({});
    const [email, setEmail] = useState({});
    const [phone, setPhone] = useState({});
    const [password, setPassword] = useState({});
    const [rePassword, setRePassword] = useState({});

    const {paramemail} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8070/buyer/get/email/${paramemail}`).then((res)=>{
            setName(res.data[0].name);
            setAddress(res.data[0].address);
            setNic(res.data[0].nic);
            setPhone(res.data[0].phone);
        }).catch((err)=>{
            alert("Network Issue...");
        })
    });

    function proceed(e){
        e.preventDefault();
    }

    return(
        <div>
            <h1>Update Buyer</h1>

            <form onSubmit={proceed}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name" value={name} required onChange={(e)=>{
                    setName(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="Enter your address" value={address} required onChange={(e)=>{
                    setAddress(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="nic">NIC</label>
                <input type="text" id="nic" placeholder="Enter you NIC number" value={nic} required onChange={(e)=>{
                    setNic(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="abc@gmail.com" value={email} required onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="phone">Phone</label>
                <input type="phone" id="phone" placeholder="Phone No" value={phone} required onChange={(e)=>{
                    setPhone(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="newpassword">New Password</label>
                <input type="password" id="newpassword" placeholder="Enter New Password" required onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="repassword">Re-enter Password</label>
                <input type="password" id="repassword" placeholder="Re-Enter New Password" required onChange={(e)=>{
                    setRePassword(e.target.value);
                }}/>

                <br></br>

                <button type="submit">Update</button>
            </form>
        </div>
    )
}