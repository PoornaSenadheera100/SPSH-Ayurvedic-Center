import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function UpdateSeller(){

    if(sessionStorage.getItem("sAyurCenNimda") === null){
        window.location.replace("/adminlogin");
    }
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [delChrg, setDelChrg] = useState();
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const {paramemail} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8070/seller/get/email/${paramemail}`).then((res)=>{
            setName(res.data[0].name);
            setEmail(res.data[0].email);
            setPhone(res.data[0].phone);
            setDelChrg(res.data[0].delChrg);
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
                phone,
                delChrg
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
                delChrg,
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
            <a href="/adminhome/managesellers"><button>Back</button></a>

            <h1>Update Seller</h1>

            <form onSubmit={proceed}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name" value={name} required onChange={(e)=>{
                    setName(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="abc@gmail.com" value={email} required disabled onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="phone">Phone</label>
                <input type="phone" id="phone" placeholder="Phone No" value={phone} required onChange={(e)=>{
                    setPhone(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="delChrg">Delivery Charge (Rs.)</label>
                <input type="number" id="delChrg" placeholder="Delivery Charge" min="0" step="0.01" value={delChrg} required onChange={(e)=>{
                    setDelChrg(e.target.value);
                }}/>

                <br></br>
                <br></br>
                Leave the fields below blank if you do not want to change the password!
                <br></br>
                <br></br>

                <label htmlFor="newpassword">New Password</label>
                <input type="password" id="newpassword" placeholder="Enter New Password" onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="repassword">Re-enter Password</label>
                <input type="password" id="repassword" placeholder="Re-Enter New Password" onChange={(e)=>{
                    setRePassword(e.target.value);
                }}/>

                <br></br>

                <button type="submit">Update</button>
            </form>
        </div>
    )
}