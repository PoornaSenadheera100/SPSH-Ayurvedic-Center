import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
export default function UpdateSeller(){

    if(sessionStorage.getItem("sAyurCenNimda") === null){
        window.location.replace("/adminlogin");
    }
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const {paramemail} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8070/seller/get/email/${paramemail}`).then((res)=>{
            setName(res.data[0].name);
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
            const newSeller = {
                name,
                email,
                phone
            }
    
            axios.put(`http://localhost:8070/seller/update/${paramemail}`, newSeller).then(()=>{
                alert("Seller Updated");
                window.location.replace("http://localhost:3000/adminhome/managesellers");
            }).catch((err)=>{
                alert("Network Error...");
            })
        }
        else{
            const newSeller = {
                name,
                email,
                phone,
                password
            }
    
            axios.put(`http://localhost:8070/seller/update/${paramemail}`, newSeller).then(()=>{
                alert("Seller Updated");
                window.location.replace("http://localhost:3000/adminhome/managesellers");
            }).catch((err)=>{
                alert("Network Error...");
            })
        }
    }

    return(
        <div className="container">
            <a href="/adminhome/managesellers"><Button variant="dark">Back</Button></a>

            <center><h1>Update Seller</h1></center>
            
            <form onSubmit={proceed}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name"   class="form-control" placeholder="Enter your name" value={name} required onChange={(e)=>{
                    setName(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="email">Email</label> <br></br>
                <input type="email" id="email"  class="form-control"placeholder="abc@gmail.com" value={email} required disabled onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="phone">Phone</label><br></br>
                <input type="phone" id="phone"  class="form-control" placeholder="Phone No" value={phone} required onChange={(e)=>{
                    setPhone(e.target.value);
                }}/>

                <br></br>
                <br></br>
                <h4>Leave the fields below blank if you do not want to change the password!</h4>
                <br></br>
                
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label htmlFor="newpassword">New Password</label>
                            <input type="password" id="newpassword" class="form-control" placeholder="Enter New Password" onChange={(e)=>{
                            setPassword(e.target.value);
                        }}/>
                    </div>

                
                    <div class="form-group col-md-4">
                        <label htmlFor="repassword">Re-enter Password</label>
                        <input type="password" id="repassword" class="form-control" placeholder="Re-Enter New Password" onChange={(e)=>{
                            setRePassword(e.target.value);
                        }}/>
                    </div>

                <br></br>
                </div>

                <button type="submit" class="btn btn-primary"style={{float:'right'}}>Update</button>
            </form>
        </div>
    )
}