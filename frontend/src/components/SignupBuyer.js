import axios from "axios";
import { useState } from "react";

export default function SignupBuyer(){

    const [name, setName] = useState({});
    const [address, setAddress] = useState({});
    const [nic, setNic] = useState({});
    const [email, setEmail] = useState({});
    const [phone, setPhone] = useState({});
    const [newPassword, setNewPassword] = useState({});
    const [rePassword, setRePassword] = useState({});
    const [account, setAccount] = useState([]);

    function sendData(){

    }

    function proceed(e){
        e.preventDefault();

        if (newPassword != rePassword){
            alert("Re-entered password does not match with the password that you have entered!");
        }
        else{
            // checkAccount();
            axios.get(`http://localhost:8070/buyer/get/email/${email}`).then((res)=>{
                if (res.data[0] === undefined){
                    console.log('Go ahead');
                }
                else{
                    console.log("Acc have");
                }
            }).catch((err)=>{
                console.log(err);
            })
            sendData();
        }
    }

    return(
        <div>
            <h1>Create Your Account</h1>

            <form onSubmit={proceed}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name" required onChange={(e)=>{
                    setName(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="Enter your address" required onChange={(e)=>{
                    setAddress(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="nic">NIC</label>
                <input type="text" id="nic" placeholder="Enter you NIC number" required onChange={(e)=>{
                    setNic(e.target.value);
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
                    setNewPassword(e.target.value);
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