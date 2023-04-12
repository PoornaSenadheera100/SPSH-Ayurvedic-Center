import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

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
            <a href="/adminhome/managebuyers"><button>Back</button></a>

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
                <input type="email" id="email" placeholder="abc@gmail.com" value={email} required disabled onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>

                <br></br>

                <label htmlFor="phone">Phone</label>
                <input type="phone" id="phone" placeholder="Phone No" value={phone} required onChange={(e)=>{
                    setPhone(e.target.value);
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