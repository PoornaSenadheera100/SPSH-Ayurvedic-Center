import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';

export default function UpdateBuyer(){

    if(sessionStorage.getItem("sAyurCenNimda") === null){
        window.location.replace("/adminlogin");
    }
    
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [nic, setNic] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const {paramemail} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8070/buyer/get/email/${paramemail}`).then((res)=>{
            setName(res.data[0].name);
            setAddress(res.data[0].address);
            setNic(res.data[0].nic);
            setEmail(res.data[0].email);
            setPhone(res.data[0].phone);
        }).catch((err)=>{
            alert("Network Issue...");
        })
    }, [paramemail]);

    function proceed(e){
        e.preventDefault();

        if (password !== rePassword){
            alert("Re-entered password does not match with the password that you have entered!");
        }
        else if(password === '' && rePassword === ''){
            const newBuyer = {
                name,
                address,
                nic,
                email,
                phone
            }
    
            axios.put(`http://localhost:8070/buyer/update/${paramemail}`, newBuyer).then(()=>{

                axios.post(`http://localhost:8072/email/update/${name}/${email}`).catch((err)=>{
                    alert("Email Service is not available.");
                })

                alert("Buyer Updated");
                window.location.replace("http://localhost:3000/adminhome/managebuyers");
            }).catch((err)=>{
                alert("Network Error...");
            })
        }
        else{
            const newBuyer = {
                name,
                address,
                nic,
                email,
                phone,
                password
            }
    
            axios.put(`http://localhost:8070/buyer/update/${paramemail}`, newBuyer).then(()=>{

            axios.post(`http://localhost:8072/email/update/${name}/${email}`).catch((err)=>{
                alert("Email Service is not available.");
            })

                alert("Buyer Updated");
                window.location.replace("http://localhost:3000/adminhome/managebuyers");
            }).catch((err)=>{
                alert("Network Error...");
            })
        }
    }

    return(
        <div className="container">
            <a href="/adminhome/managebuyers"><Button variant="dark">Back</Button></a>

            <center><h1>Update Buyer</h1></center>

        <form onSubmit={proceed}>
            <div class="form-row">
                    <div class="form-group col-md-6">
                     <label htmlFor="name">Name</label>
                     <input type="text" id="name" class="form-control"  placeholder="Enter your name"  	value={name} required onChange={(e)=>{
                        setName(e.target.value);}}/>
                    </div>

                <div class="form-group col-md-6">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" class="form-control" placeholder="Enter your address" 	value={address} required onChange={(e)=>{
                        setAddress(e.target.value);}}/>
                </div>
            </div>

            <div class="form-group">
                <label htmlFor="nic">NIC</label>
                <input type="text" id="nic" class="form-control" placeholder="Enter you NIC number"    	value={nic} required onChange={(e)=>{
                    setNic(e.target.value);
                }}/>
            </div>

            <div class="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" class="form-control" placeholder="abc@gmail.com" value={email} required disabled onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>
            </div>


            <div class="form-row">
                
                <label htmlFor="phone">Phone</label>
                <input type="phone" id="phone" class="form-control" placeholder="Phone No" value={phone} required onChange={(e)=>{
                    setPhone(e.target.value);
                }}/>
            </div>
            <br></br>
            <h4>Leave the fields below blank if you do not want to change the password!</h4>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label htmlFor="newpassword">New Password</label>
                    <input type="password" id="newpassword" class="form-control" placeholder="Enter New Password" 	onChange={(e)=>{
                    setPassword(e.target.value);
                    }}/>
                </div>
        
                <div class="form-group col-md-4">
            
                    <label htmlFor="repassword">Re-enter Password</label>
                    <input type="password" id="repassword"  class="form-control" placeholder="Re-Enter New Password" onChange={(e)=>{
                        setRePassword(e.target.value);
                    }}/>
                </div>
            </div>
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
        
    )
}